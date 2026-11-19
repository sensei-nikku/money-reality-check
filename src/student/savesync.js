/* ════════════════════════════════════════════════════════════════════
   SaveSyncJS — interim save for Money Reality Check (student view)

   Bundled into student.js after app.js. Server half: mrcSync() in Code.gs.
   The starting revision comes from window.MRC_BOOT (no extra request).

   1. Every edit is backed up on this device within ~1 s (survives a closed
      tab, dead battery, dropped Wi-Fi). The backup is deleted once the
      server confirms it has the same work.
   2. Server save: 10 s after the student stops typing, never more than 60 s
      after the first unsaved edit, right after Next/Back/tab, when the tab
      is hidden, and on "Save now". Unchanged work is never re-sent.
   3. One save in flight at a time; edits made during a save go in the next.
   4. Each save carries the revision it was built on. If another tab/device
      saved newer work, the server refuses and this page asks for a reload.
   5. Failures retry with backoff (2 s → 60 s, jittered). Sign-outs stop and
      ask for a reload; the device backup carries the work across.
   6. A section is only read back into DATA after it has been restored on
      screen. Without this, a blank never-opened section overwrites saved
      answers — on page load (current section) and at Submit (every section
      the student finished in an earlier sitting).
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = {
    IDLE_MS: 10000,
    MAX_WAIT_MS: 60000,
    NAV_MS: 500,
    LOCAL_MS: 600,
    POLL_MS: 30000,
    RETRY_BASE_MS: 2000,
    RETRY_MAX_MS: 60000,
    SUBMIT_WAIT_MS: 10000,
    LOCAL_TTL_MS: 14 * 24 * 3600 * 1000,
    LOCAL_PREFIX: 'mrc_unsynced_v1:'
  };

  var S = {
    started: false, halted: '', paused: false, suppress: false,
    rev: null, max: 0, seq: 0,
    dirty: false, inflight: false, firstDirtyAt: 0, nextAllowedAt: 0, failures: 0,
    lastAcked: null, savedAt: null, recovered: false, localOk: false,
    hydrated: {}, timer: null, localTimer: null,
    state: undefined, pendingStart: null, status: 'loaded'
  };

  /* ── hook into StudentJS ─────────────────────────────────────────── */
  var restoreName = typeof window.restoreSec === 'function' ? 'restoreSec'
                  : typeof window.restoreSection === 'function' ? 'restoreSection' : '';
  var orig = {
    startApp: window.startApp,
    collectData: window.collectData,
    restore: restoreName ? window[restoreName] : null,
    doSubmit: window.doSubmit
  };
  if (typeof orig.startApp !== 'function' || typeof orig.collectData !== 'function' || !orig.restore) {
    console.warn('[SaveSync] StudentJS hooks not found — interim save is OFF; old save behavior unchanged.');
    return;
  }

  // Never read a section that hasn't been restored on screen yet.
  window.collectData = function (sec) {
    if (!S.hydrated[sec]) return;
    return orig.collectData.apply(this, arguments);
  };

  // Restore, then replay input/change so word counts, Do It checks and
  // gates re-evaluate against the restored values.
  window[restoreName] = function (n) {
    S.suppress = true;
    try {
      var r = orig.restore.apply(this, arguments);
      replayValidation(n);
      return r;
    } finally {
      S.hydrated[n] = true;
      S.suppress = false;
    }
  };

  window.autoSave = function () {          // StudentJS calls this from goSec()
    if (!S.started) return;
    var sec = Number(SEC) || 0;
    if (sec > S.max) { S.max = sec; markDirty(); }
    if (S.dirty) scheduleSync(CFG.NAV_MS);
  };

  window.showSaved = function () {};       // header status replaces the per-section label

  window.startApp = function () {
    var self = this, args = arguments;
    var run = function () { begin(self, args); };
    if (S.state === undefined) S.pendingStart = run; else run();
  };

  if (typeof orig.doSubmit === 'function') {
    window.doSubmit = function () {
      var self = this, args = arguments;
      S.paused = true;
      clearTimeout(S.timer);
      var go = function () {
        try { orig.doSubmit.apply(self, args); }
        finally {
          // If they cancelled the confirm or the submit failed, resume saving.
          setTimeout(function () {
            S.paused = false;
            if (S.halted !== 'submitted') setStatus(S.dirty ? 'dirty' : 'saved');
            if (S.dirty) scheduleSync(CFG.NAV_MS);
          }, 15000);
        }
      };
      if (!S.inflight) return go();
      setStatus('finishing');
      waitForIdle(go, CFG.SUBMIT_WAIT_MS);
    };
  }

  /* ── server state: comes in the page itself (window.MRC_BOOT) ────── */
  (function () {
    var b = window.MRC_BOOT, u = b && b.user;
    gotState(u ? { email: u.email, status: u.status, max: Number(u.currentSection) || 0, rev: Number(u.rev) || 0 } : null);
  })();

  function gotState(st) {
    if (S.state !== undefined) return;     // first answer wins
    S.state = st;
    if (st && st.status === 'submitted') clearLocal();
    if (S.pendingStart) { var f = S.pendingStart; S.pendingStart = null; f(); }
  }

  function begin(self, args) {
    var st = S.state;
    if (st && typeof st.rev === 'number') S.rev = st.rev;
    S.max = Math.max(Number(SEC) || 0, (st && st.max) || 0);
    recoverLocal(st);
    S.started = true;
    orig.startApp.apply(self, args);
    mountUI();
    if (S.recovered) {
      S.lastAcked = null;
      S.seq++; S.dirty = true; S.firstDirtyAt = Date.now();
      setStatus('recovered');
      scheduleSync(CFG.NAV_MS);
    } else {
      S.lastAcked = fingerprint();
      setStatus('loaded');
    }
    setInterval(poll, CFG.POLL_MS);
  }

  /* ── change tracking ─────────────────────────────────────────────── */
  function onEdit(e) {
    if (!S.started || S.suppress) return;
    var t = e.target;
    if (!t || !t.closest || !t.closest('.sec')) return;
    if (e.type === 'click' && !t.closest('button, label, [data-rkey], .rbtn, .scenario, input[type=checkbox], input[type=radio]')) return;
    markDirty();
  }
  document.addEventListener('input', onEdit, true);
  document.addEventListener('change', onEdit, true);
  document.addEventListener('click', onEdit, true);

  // Safety net: catches anything that changed without an event.
  function poll() {
    if (!S.started || S.halted === 'submitted' || S.inflight || S.dirty) return;
    if (fingerprint() !== S.lastAcked) markDirty();
  }

  function markDirty() {
    if (!S.started || S.halted === 'submitted') return;
    S.seq++;
    if (!S.dirty) S.firstDirtyAt = Date.now();
    S.dirty = true;
    scheduleLocal();
    if (S.halted) return;                  // keep the device backup current, skip the server
    setStatus('dirty');
    scheduleSync(CFG.IDLE_MS);
  }

  /* ── server sync ─────────────────────────────────────────────────── */
  function scheduleSync(delay) {
    if (S.halted || S.paused) return;
    var now = Date.now(), wait = delay;
    if (S.firstDirtyAt) wait = Math.min(wait, S.firstDirtyAt + CFG.MAX_WAIT_MS - now);
    wait = Math.max(wait, S.nextAllowedAt - now, 0);
    clearTimeout(S.timer);
    S.timer = setTimeout(function () { flush(false); }, wait);
  }

  function flush(force) {
    clearTimeout(S.timer); S.timer = null;
    if (!S.started || S.halted || S.paused || S.inflight) return;
    if (!S.dirty && !force) return;

    var fp = fingerprint();                // also collects the open section into DATA
    if (!force && fp === S.lastAcked) {    // nothing actually changed
      S.dirty = false; S.firstDirtyAt = 0;
      clearTimeout(S.localTimer); clearLocal();
      setStatus('saved');
      return;
    }

    var json;
    try { json = JSON.stringify(DATA); } catch (e) { console.warn('[SaveSync] stringify', e); return; }
    var seqAtSend = S.seq;
    S.inflight = true; S.dirty = false; S.firstDirtyAt = 0;
    writeLocal();
    setStatus('saving');
    google.script.run
      .withSuccessHandler(function (r) { S.inflight = false; onResult(r || {}, seqAtSend, fp); })
      .withFailureHandler(function (err) { S.inflight = false; onFail(err); })
      .mrcSync({ baseRev: S.rev, max: S.max, json: json });
  }

  function onResult(r, seqAtSend, fp) {
    if (r.ok) {
      S.rev = r.rev; S.failures = 0; S.nextAllowedAt = 0;
      S.lastAcked = fp; S.savedAt = new Date();
      if (S.seq === seqAtSend && !S.dirty) {
        clearTimeout(S.localTimer); clearLocal();
        if (!S.paused) setStatus('saved');
      } else {                             // edits arrived while saving
        writeLocal();
        setStatus('dirty');
        scheduleSync(CFG.IDLE_MS);
      }
      return;
    }
    if (r.submitted) { clearLocal(); halt('submitted'); return; }
    S.dirty = true;
    if (r.conflict)  { halt('conflict');  return; }
    if (r.signedOut) { halt('signedout'); return; }
    if (r.tooLarge)  { halt('toolarge');  return; }
    onFail(r.busy ? 'busy' : (r.error || 'error'));
  }

  function onFail(err) {
    S.dirty = true;
    if (!S.firstDirtyAt) S.firstDirtyAt = Date.now();
    writeLocal();
    var msg = String((err && err.message) || err || '');
    if (/authoriz|sign ?in|signed out|log ?in/i.test(msg)) { halt('signedout'); return; }
    S.failures++;
    var d = Math.min(CFG.RETRY_MAX_MS, CFG.RETRY_BASE_MS * Math.pow(2, S.failures - 1));
    d = Math.round(d * (0.75 + Math.random() * 0.5));
    S.nextAllowedAt = Date.now() + d;
    setStatus('retrying');
    clearTimeout(S.timer);
    S.timer = setTimeout(function () { flush(false); }, d);
  }

  function halt(reason) {
    S.halted = reason;
    clearTimeout(S.timer); S.timer = null;
    setStatus(reason);
  }

  function saveNow() {
    if (S.halted === 'conflict' || S.halted === 'submitted') return;
    if (S.halted) S.halted = '';           // signed out / too large: allow another try
    S.nextAllowedAt = 0; S.failures = 0;
    S.seq++; S.dirty = true;
    if (S.inflight) { setStatus('saving'); return; }   // resends after the current save lands
    flush(true);
  }

  function waitForIdle(cb, maxMs) {
    var t0 = Date.now();
    (function tick() {
      if (!S.inflight || Date.now() - t0 > maxMs) return cb();
      setTimeout(tick, 200);
    })();
  }

  /* ── device backup (unsynced work only) ──────────────────────────── */
  function emailKey() {
    var em = (typeof USER_EMAIL === 'string' && USER_EMAIL) || (S.state && S.state.email) || '';
    return em ? CFG.LOCAL_PREFIX + em.toLowerCase() : '';
  }
  function writeLocal() {
    var k = emailKey(); if (!k) return;
    try {
      localStorage.setItem(k, JSON.stringify({
        v: 1, baseRev: S.rev, sec: Number(SEC) || 0, max: S.max, ts: Date.now(), data: DATA
      }));
      S.localOk = true;
    } catch (e) { S.localOk = false; }
  }
  function readLocal() {
    var k = emailKey(); if (!k) return null;
    try { var raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function clearLocal() {
    var k = emailKey(); if (!k) return;
    try { localStorage.removeItem(k); } catch (e) {}
  }
  function scheduleLocal() {
    clearTimeout(S.localTimer);
    S.localTimer = setTimeout(function () {
      if (S.dirty || S.inflight || S.halted) { collectOpen(); writeLocal(); }
    }, CFG.LOCAL_MS);
  }

  function recoverLocal(st) {
    var L = readLocal();
    if (!L) return;
    if (L.v !== 1 || !L.data || !L.ts || Date.now() - L.ts > CFG.LOCAL_TTL_MS) { clearLocal(); return; }
    if (!st) return;                       // can't tell which copy is newer — keep it for next load
    var same = L.baseRev === S.rev || (L.baseRev === null && S.rev === 0);
    if (!same) { clearLocal(); return; }   // server already has newer work from elsewhere
    DATA = L.data;
    if (typeof L.sec === 'number') SEC = L.sec;
    S.max = Math.max(S.max, Number(L.max) || 0, Number(SEC) || 0);
    S.recovered = true;
  }

  /* ── helpers ─────────────────────────────────────────────────────── */
  function collectOpen() {
    var sec = Number(SEC) || 0;
    try { window.collectData(sec); } catch (e) { console.warn('[SaveSync] collect', e); }
    if (sec > S.max) S.max = sec;
  }
  function fingerprint() {
    collectOpen();
    try { return JSON.stringify(DATA) + '|' + S.max; } catch (e) { return String(Math.random()); }
  }

  function replayValidation(n) {
    var el = document.getElementById('s' + n);
    if (!el) return;
    var f = el.querySelectorAll('input, textarea, select');
    for (var i = 0; i < f.length; i++) {
      var x = f[i], t = (x.type || '').toLowerCase();
      if (t === 'button' || t === 'submit' || t === 'hidden') continue;
      if ((t === 'checkbox' || t === 'radio') ? !x.checked : x.value === '') continue;
      fire(x, 'input'); fire(x, 'change');
    }
  }
  function fire(el, type) {
    var ev;
    try { ev = new Event(type, { bubbles: true }); }
    catch (e) { ev = document.createEvent('Event'); ev.initEvent(type, true, true); }
    try { el.dispatchEvent(ev); } catch (e) { console.warn('[SaveSync] replay', e); }
  }

  /* ── page lifecycle ──────────────────────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && S.started && (S.dirty || S.inflight)) {
      collectOpen(); writeLocal(); flush(false);
    }
  });
  window.addEventListener('pagehide', function () {
    if (S.started && (S.dirty || S.inflight)) { collectOpen(); writeLocal(); }
  });
  window.addEventListener('online', function () {
    if (S.started && S.dirty && !S.halted) { S.nextAllowedAt = 0; flush(false); }
  });
  window.addEventListener('beforeunload', function (e) {
    if (!S.started || S.paused || S.halted === 'submitted') return;
    if (!(S.dirty || S.inflight)) return;
    collectOpen(); writeLocal();
    if (S.halted) return;                  // backup written; don't nag on a reload we asked for
    e.preventDefault(); e.returnValue = ''; return '';
  });

  /* ── status bar ──────────────────────────────────────────────────── */
  function timeStr(d) {
    if (!d) return '';
    try { return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
    catch (e) { return d.toLocaleTimeString(); }
  }
  var MSG = {
    loaded:    'All work saved',
    dirty:     'Unsaved changes',
    saving:    'Saving…',
    saved:     function () { return 'All work saved · ' + timeStr(S.savedAt); },
    recovered: 'Recovered unsaved work from this device. Saving…',
    finishing: 'Finishing your last save…',
    retrying:  function () { return S.localOk
                 ? 'Not saved yet. Trying again. Your work is kept on this device.'
                 : 'Not saved yet. Trying again. Keep this page open.'; },
    signedout: function () { return S.localOk
                 ? 'You were signed out. Reload to keep saving. Your work is kept on this device.'
                 : 'You were signed out. Copy your newest answer somewhere, then reload.'; },
    conflict:  'This page is out of date. Your work was saved from another tab or device. Reload to continue.',
    toolarge:  'Too much text to save. Shorten your longest answer, then press Save now.',
    submitted: 'Already submitted. Changes are not saved.'
  };
  var TONE = { retrying: 'warn', signedout: 'bad', conflict: 'bad', toolarge: 'bad' };

  function setStatus(k) { S.status = k; paint(); }

  function paint() {
    var bar = document.getElementById('ssBar');
    if (!bar) return;
    var k = S.status, m = MSG[k];
    document.getElementById('ssStatus').textContent = typeof m === 'function' ? m() : (m || '');
    bar.setAttribute('data-tone', TONE[k] || '');
    document.getElementById('ssReload').style.display = (k === 'signedout' || k === 'conflict') ? 'inline-block' : 'none';
    document.getElementById('ssSave').disabled =
      (k === 'saving' || k === 'finishing' || k === 'conflict' || k === 'submitted');
  }

  function mountUI() {
    if (document.getElementById('ssBar')) return;
    var css = document.createElement('style');
    css.textContent =
      '#ssBar{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;' +
        'padding:4px 0 2px;font-size:12px;line-height:1.3}' +
      '#ssStatus{color:var(--dg,#555)}' +
      '#ssBar[data-tone=warn] #ssStatus{color:#B45309;font-weight:600}' +
      '#ssBar[data-tone=bad] #ssStatus{color:#B91C1C;font-weight:600}' +
      '#ssBar button{font:inherit;font-weight:600;padding:4px 10px;border-radius:6px;' +
        'border:1.5px solid #2B7A78;background:#fff;color:#2B7A78;cursor:pointer}' +
      '#ssBar button:disabled{opacity:.5;cursor:default}' +
      '#ssReload{display:none}' +
      '@media print{#ssBar{display:none}}';
    document.head.appendChild(css);

    var bar = document.createElement('div');
    bar.id = 'ssBar';
    bar.className = 'no-print';
    bar.innerHTML =
      '<span id="ssStatus" role="status" aria-live="polite"></span>' +
      '<button type="button" id="ssReload">Reload</button>' +
      '<button type="button" id="ssSave">Save now</button>';
    (document.getElementById('stickyHdr') || document.body).appendChild(bar);
    document.getElementById('ssSave').onclick = saveNow;
    document.getElementById('ssReload').onclick = function () { S.paused = true; location.reload(); };
    paint();
  }
})();
