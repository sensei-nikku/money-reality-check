/* ════════════════════════════════════════════════════════════════════
   CERJS — Claim / Evidence / Reasoning for every Think About It answer

   Bundled into student.js after resources.js.
   No server change: answers are stored in the same answer field as before.
   The teacher dashboard shows the three parts on separate labeled lines.

   How it works
   - Each Think About It question gets three boxes: Claim, Evidence,
     Reasoning, each with its own word minimum and counter.
   - The original answer box stays in place, hidden, and still holds the
     answer. The three parts are written into it as
         [CLAIM] …  [EVIDENCE] …  [REASONING] …
     so saving, the teacher dashboard and the printout keep working, and
     each part shows up labeled.
   - Next stays locked until every answer in the section has all three
     parts. Submit is blocked the same way (checked against saved work,
     so sections from an earlier sitting count).
   - Answers written before this update ("legacy") are moved into the
     Reasoning box with a note. They still pass if they met the old
     30-word rule; editing one switches it to the new rules.
   - Each Think About It block shows how answers are graded, that any
     section can be sent back for rework, and a model answer to a
     question that isn't on the test.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var MIN = { c: 5, e: 15, r: 20 };   // words per part
  var LEGACY_MIN = 30;                // old one-box rule, for answers written before this update
  var KEYS = ['paycheck', 'banking', 'insurance', 'credit', 'loans', 'budget', 'reflection'];

  var PARTS = [
    { k: 'c', name: 'Claim',     tag: 'CLAIM',
      hint: 'Your answer, in one sentence.',
      ph: 'I think… / I would… / The answer is…' },
    { k: 'e', name: 'Evidence',  tag: 'EVIDENCE',
      hint: 'Proof: a number from your work above, or a fact from Learn. Say where it came from.',
      ph: 'From my numbers above: … / The Learn section says: …' },
    { k: 'r', name: 'Reasoning', tag: 'REASONING',
      hint: 'Explain why your evidence proves your claim.',
      ph: 'This shows… because… / That matters because…' }
  ];

  /* ── text format ─────────────────────────────────────────────────── */
  function wc(s) { s = String(s || '').trim(); return s ? s.split(/\s+/).length : 0; }

  function compose(p) {
    var c = (p.c || '').trim(), e = (p.e || '').trim(), r = (p.r || '').trim();
    if (!c && !e && !r) return '';
    return '[CLAIM] ' + c + '\n[EVIDENCE] ' + e + '\n[REASONING] ' + r;
  }

  var RX = /^\s*\[CLAIM\] ?([\s\S]*?)\n\[EVIDENCE\] ?([\s\S]*?)\n\[REASONING\] ?([\s\S]*)$/;
  function parse(v) {
    v = String(v || '');
    var m = v.match(RX);
    if (m) return { c: m[1].trim(), e: m[2].trim(), r: m[3].trim(), legacy: false };
    if (!v.trim()) return { c: '', e: '', r: '', legacy: false };
    return { c: '', e: '', r: v.trim(), legacy: true };
  }

  function complete(v) {
    var p = parse(v);
    if (p.legacy) return wc(v) >= LEGACY_MIN;
    return wc(p.c) >= MIN.c && wc(p.e) >= MIN.e && wc(p.r) >= MIN.r;
  }

  /* ── helpers ─────────────────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function secOf(el) {
    var s = el.closest && el.closest('.sec');
    var m = s && /^s(\d+)$/.exec(s.id);
    return m ? +m[1] : -1;
  }
  function thinkBlock(n) {
    var sec = $('s' + n);
    return $('think' + n) || (sec && sec.querySelector('.b-think'));
  }
  function questions(n) {           // every written-answer question in the section (same set checkGate counts)
    var sec = $('s' + n); if (!sec) return [];
    var out = [], q = sec.querySelectorAll('.kc-q');
    for (var i = 0; i < q.length; i++) { var ta = q[i].querySelector('textarea'); if (ta) out.push({ kcq: q[i], ta: ta }); }
    return out;
  }
  function fire(el, type) {
    var ev;
    try { ev = new Event(type, { bubbles: true }); }
    catch (x) { ev = document.createEvent('Event'); ev.initEvent(type, true, true); }
    el.dispatchEvent(ev);
  }
  function sectionName(n) {
    var names = (typeof SNAMES !== 'undefined' && SNAMES) || ['Paycheck', 'Banking', 'Insurance', 'Credit', 'Loans', 'Budget', 'Reflect'];
    return 'Section ' + (n + 1) + ' (' + names[n] + ')';
  }

  /* ── build the three boxes for one question ──────────────────────── */
  function build(q) {
    var kcq = q.kcq, ta = q.ta;
    if (kcq.__cer) return kcq.__cer;

    ta.style.display = 'none';
    ta.setAttribute('aria-hidden', 'true');
    var wcp = ta.nextElementSibling;
    if (wcp && wcp.classList.contains('wc')) wcp.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.className = 'cer';                               // deliberately NOT inside .kc-q
    var html = '';
    PARTS.forEach(function (P) {
      html += '<div class="cer-part" data-part="' + P.k + '">'
        + '<div class="cer-top"><span class="cer-badge cer-' + P.k + '">' + P.name.charAt(0) + '</span>'
        + '<span class="cer-name">' + P.name + '</span>'
        + '<span class="cer-count" aria-live="polite"></span></div>'
        + '<p class="cer-hint">' + esc(P.hint) + '</p>'
        + '<textarea class="cer-box" rows="' + (P.k === 'c' ? 2 : 3) + '" placeholder="' + esc(P.ph) + '"'
        + ' aria-label="' + P.name + '"></textarea>'
        + (P.k === 'e' ? '<p class="cer-tip" hidden>Tip: strong evidence usually has a number. Scroll up to your Apply or Do It work.</p>' : '')
        + '</div>';
    });
    html += '<p class="cer-legacy" hidden>This answer was written before the Claim, Evidence and Reasoning boxes, so all of it is in Reasoning. '
      + 'Split it up: answers without all three can be sent back for rework.</p>';
    wrap.innerHTML = html;
    kcq.parentNode.insertBefore(wrap, kcq.nextSibling);

    var st = { ta: ta, wrap: wrap, last: null, legacy: false, box: {} };
    PARTS.forEach(function (P) { st.box[P.k] = wrap.querySelector('[data-part="' + P.k + '"] textarea'); });
    kcq.__cer = st;
    wrap.__cer = st;
    return st;
  }

  function current(st) { return { c: st.box.c.value, e: st.box.e.value, r: st.box.r.value }; }

  // Answer box -> three boxes (the hidden answer box wins whenever it changed underneath us).
  function pull(st) {
    if (st.ta.value === st.last) return;
    var p = parse(st.ta.value);
    st.box.c.value = p.c; st.box.e.value = p.e; st.box.r.value = p.r;
    st.legacy = p.legacy;
    st.last = st.ta.value;
    paint(st);
  }

  // Three boxes -> answer box, only when the student actually changed something.
  function push(st) {
    var v = compose(current(st));
    if (st.last !== null && v === compose(parse(st.last))) return;   // nothing new (e.g. a replayed event)
    st.legacy = false;
    st.ta.value = v;
    st.last = v;
    fire(st.ta, 'input');           // runs the original onTA(): word count + checkGate()
    paint(st);
  }

  function paint(st) {
    var cur = current(st);
    PARTS.forEach(function (P) {
      var el = st.wrap.querySelector('[data-part="' + P.k + '"] .cer-count');
      var n = wc(cur[P.k]);
      var min = MIN[P.k];
      el.textContent = n >= min ? '✓ ' + n + ' words' : n + ' / ' + min + ' words';
      el.className = 'cer-count' + (n >= min ? ' met' : '');
    });
    var tip = st.wrap.querySelector('.cer-tip');
    if (tip) tip.hidden = !(wc(cur.e) >= 5 && !/\d/.test(cur.e));
    st.wrap.querySelector('.cer-legacy').hidden = !st.legacy;
    // mirror a disabled/read-only original box (submitted or locked states)
    var off = st.ta.disabled || st.ta.readOnly;
    PARTS.forEach(function (P) { st.box[P.k].disabled = off; });
  }

  /* ── grading notice + model answer, once per Think About It block ── */
  var NOTICE =
      '<p class="cer-n-h">How your answers are graded</p>'
    + '<p>There is no single right opinion. Every answer needs three parts:</p>'
    + '<ul><li><b>Claim:</b> your answer, in one sentence.</li>'
    + '<li><b>Evidence:</b> proof. Use a number from your work above or a fact from Learn, and say where it came from.</li>'
    + '<li><b>Reasoning:</b> why that evidence proves your claim.</li></ul>'
    + '<p class="cer-n-warn">Your teacher reads every answer. Any section that doesn\'t have a clear claim, evidence and reasoning '
    + 'for each answer can be sent back for rework.</p>'
    + '<details><summary>See a strong answer (to a practice question that isn\'t on this test)</summary>'
    + '<p class="cer-ex-q">Practice question: Is a $65-a-year warehouse store membership worth it for you?</p>'
    + '<p><span class="cer-badge cer-c">C</span> It\'s worth it for me only if I buy things that keep, because the savings have to be more than $65.</p>'
    + '<p><span class="cer-badge cer-e">E</span> If I save about $8 a week by buying in bulk, that\'s $8 × 52 = $416 a year, '
    + 'far more than $65. But the last big bag of rice I bought went stale before I finished it.</p>'
    + '<p><span class="cer-badge cer-r">R</span> The math says yes, but only if I actually use what I buy. Food I throw away isn\'t savings, '
    + 'so I\'d stick to things that last, like toilet paper and coffee. Then the $65 pays for itself in about two months.</p>'
    + '</details>';

  function addNotice(n) {
    var th = thinkBlock(n);
    if (!th) { var q = questions(n)[0]; th = q && (q.kcq.closest('.block') || q.kcq.parentNode); }
    if (!th || th.querySelector('.cer-notice')) return;
    var el = document.createElement('div');
    el.className = 'cer-notice no-print';
    el.innerHTML = NOTICE;
    var bt = th.querySelector('.bt');                 // "Think About It" title, at any depth
    if (bt) bt.parentNode.insertBefore(el, bt.nextSibling);
    else th.insertBefore(el, th.firstChild);
  }

  /* ── Next-button gate ────────────────────────────────────────────── */
  var lastMsg = {};
  function sectionStatus(n) {
    var qs = questions(n), done = 0;
    qs.forEach(function (q) { if (complete(q.ta.value)) done++; });
    return { total: qs.length, done: done };
  }
  function enforce(n) {
    var btn = $('gate' + n);
    if (!btn) return;
    var th = thinkBlock(n);
    if (th && th.classList.contains('locked')) return;      // "Complete Do It first" stays in charge
    var s = sectionStatus(n);
    var msg = $('gateMsg' + n);
    if (s.done < s.total) {
      btn.disabled = true;
      if (msg) {
        lastMsg[n] = 'Every answer needs a Claim, Evidence and Reasoning (' + s.done + ' of ' + s.total + ' answers done).';
        msg.textContent = lastMsg[n];
      }
    } else if (msg && lastMsg[n] && msg.textContent === lastMsg[n]) {
      msg.textContent = '';
      lastMsg[n] = '';
    }
  }

  /* ── sync everything (idempotent; runs after every navigation) ───── */
  function syncAll() {
    for (var n = 0; n < KEYS.length; n++) {
      var qs = questions(n);
      if (!qs.length) continue;
      addNotice(n);
      qs.forEach(function (q) { pull(build(q)); });
    }
    var cur = (typeof SEC !== 'undefined') ? SEC : -1;
    if (cur >= 0 && cur < KEYS.length) {
      if (typeof window.checkGate === 'function') window.checkGate(cur); else enforce(cur);
    }
    summaryNote();
  }

  /* ── typing in the three boxes ───────────────────────────────────── */
  function onBox(e) {
    var t = e.target;
    if (!t || !t.classList || !t.classList.contains('cer-box')) return;
    var wrap = t.closest('.cer');
    if (wrap && wrap.__cer) push(wrap.__cer);
  }
  document.addEventListener('input', onBox, true);

  /* ── submit check (reads saved work, so earlier sittings count) ──── */
  function incompleteSections() {
    var data = (typeof DATA !== 'undefined' && DATA) || {};
    var bad = [];
    for (var n = 0; n < KEYS.length; n++) {
      if (!questions(n).length) continue;                      // section has no Think About It
      var ans = data[KEYS[n]] && data[KEYS[n]].answers;
      var ok = Array.isArray(ans) && ans.length > 0;
      if (ok) for (var i = 0; i < ans.length; i++) if (!complete(ans[i] && ans[i].a)) { ok = false; break; }
      if (!ok) bad.push(n);
    }
    return bad;
  }

  function summaryNote(bad) {
    var host = $('sSummary'); if (!host) return;
    var el = host.querySelector('.cer-sum');
    if (!el) {
      el = document.createElement('div');
      el.className = 'cer-sum no-print';
      host.insertBefore(el, host.firstChild);
    }
    if (bad && bad.length) {
      el.setAttribute('data-state', 'blocked');
      el.innerHTML = '<p><b>Not ready to submit.</b> These sections have answers missing a claim, evidence or reasoning:</p>'
        + bad.map(function (n) {
            return '<button type="button" class="cer-jump" data-sec="' + n + '">Go to ' + esc(sectionName(n)) + '</button>';
          }).join(' ');
    } else {
      el.setAttribute('data-state', 'ok');
      el.innerHTML = '<p><b>Before you submit:</b> check that every answer has a clear claim, evidence and reasoning. '
        + 'Sections without them get sent back for rework.</p>';
    }
  }

  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('.cer-jump');
    if (b && typeof window.goSec === 'function') window.goSec(+b.getAttribute('data-sec'));
  });

  /* ── hooks ───────────────────────────────────────────────────────── */
  if (typeof window.checkGate === 'function') {
    var origCheckGate = window.checkGate;
    window.checkGate = function (n) {
      var r = origCheckGate.apply(this, arguments);
      try { enforce(n); } catch (x) { console.warn('[CER]', x); }
      return r;
    };
  }
  if (typeof window.goSec === 'function') {
    var origGoSec = window.goSec;
    window.goSec = function () {
      var r = origGoSec.apply(this, arguments);
      try { syncAll(); } catch (x) { console.warn('[CER]', x); }
      return r;
    };
  }
  if (typeof window.doSubmit === 'function') {
    var origSubmit = window.doSubmit;
    window.doSubmit = function () {
      var bad = incompleteSections();
      if (bad.length) { summaryNote(bad); window.scrollTo(0, 0); return; }
      return origSubmit.apply(this, arguments);
    };
  }

  /* ── styles ──────────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    '.cer{margin:6px 0 18px;padding:10px 12px;border:1px solid #e3e3e3;border-radius:8px;background:#fff;color:#1A1A2E}' +
    '.cer-part+.cer-part{margin-top:10px}' +
    '.cer-top{display:flex;align-items:center;gap:8px}' +
    '.cer-name{font-weight:700;font-size:14px}' +
    '.cer-count{margin-left:auto;font-size:12px;color:#777;white-space:nowrap}' +
    '.cer-count.met{color:#2E7D32;font-weight:600}' +
    '.cer-hint{margin:2px 0 4px;font-size:12px;color:#555}' +
    '.cer-box{width:100%;box-sizing:border-box;font:inherit;font-size:14px;padding:8px;border:1.5px solid #ccc;border-radius:6px;resize:vertical}' +
    '.cer-box:focus{outline:none;border-color:#2B7A78}' +
    '.cer-tip{margin:4px 0 0;font-size:12px;color:#92400E}' +
    '.cer-legacy{margin:10px 0 0;font-size:12px;color:#92400E;background:#FFF3E6;border-radius:6px;padding:6px 8px}' +
    '.cer-badge{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;' +
      'font-size:11px;font-weight:800;color:#fff;flex:none;vertical-align:middle}' +
    '.cer-c{background:#2B7A78}.cer-e{background:#B45309}.cer-r{background:#1E3A5F}' +
    '.cer-notice{background:#fff;color:#1A1A2E;border-left:4px solid #B45309;border-radius:8px;padding:10px 12px;margin:0 0 10px;font-size:13px;line-height:1.45}' +
    '.cer-notice p{margin:0 0 6px}.cer-notice ul{margin:0 0 6px;padding-left:18px}' +
    '.cer-n-h{font-weight:700;font-size:14px}' +
    '.cer-n-warn{font-weight:600}' +
    '.cer-notice details{margin-top:4px}.cer-notice summary{cursor:pointer;color:#2B7A78;font-weight:600}' +
    '.cer-notice details p{margin:6px 0}.cer-ex-q{font-style:italic}' +
    '.cer-sum{border-radius:8px;padding:10px 12px;margin:0 0 12px;font-size:13px;line-height:1.45;background:#E8F5F4;color:#1A1A2E}' +
    '.cer-sum[data-state=blocked]{background:#FFEBEE}' +
    '.cer-sum p{margin:0 0 6px}' +
    '.cer-jump{font:inherit;font-weight:600;padding:5px 10px;margin:2px 4px 2px 0;border-radius:6px;border:1.5px solid #B91C1C;background:#fff;color:#B91C1C;cursor:pointer}' +
    '@media print{.cer-notice,.cer-sum,.cer-tip,.cer-legacy{display:none!important}}';
  document.head.appendChild(css);

  try { syncAll(); } catch (x) { console.warn('[CER]', x); }
})();
