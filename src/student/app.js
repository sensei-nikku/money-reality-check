/* ═══ STATE ═══ */
var USER_EMAIL = '', SEC = 0, DATA = {}, MW = 30;
var SNAMES = ['Paycheck','Banking','Insurance','Credit','Loans','Budget','Reflect'];
var TOTAL = SNAMES.length;

/* ═══ HELPERS ═══ */
function $(id) { return document.getElementById(id); }
function fmt(n) { return '$' + Math.round(n || 0).toLocaleString(); }
function fmtD(n) { return '$' + (n || 0).toFixed(2); }
function pct(n) { return Math.round(n || 0) + '%'; }
function wc(s) { return s.trim() === '' ? 0 : s.trim().split(/\s+/).length; }

function fedTax(inc) {
  var br = [[11600,.1],[47150,.12],[100525,.22],[191950,.24],[243725,.32],[609350,.35],[Infinity,.37]];
  var tx = Math.max(0, inc - 15000), t = 0, p = 0;
  for (var i = 0; i < br.length; i++) {
    var ch = Math.min(tx, br[i][0]) - p;
    if (ch <= 0) break;
    t += ch * br[i][1];
    p = br[i][0];
  }
  return t;
}

function creditCalc(b, a, p) {
  if (b <= 0 || p <= 0) return { mo: 0, tot: 0, int: 0 };
  var mr = a / 100 / 12;
  if (p <= b * mr) return { mo: Infinity, tot: Infinity, int: Infinity };
  var r = b, m = 0, t = 0;
  while (r > 0.01 && m < 600) { r -= (p - r * mr); t += p; m++; }
  return { mo: m, tot: t, int: t - b };
}

function fmtMo(m) {
  if (m === Infinity) return 'Never';
  var y = Math.floor(m / 12), mo = m % 12;
  return y ? y + 'yr ' + mo + 'mo' : mo + 'mo';
}

/* Escape text before it goes into innerHTML (students' answers can contain < and &). */
function escH(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* ═══ INIT ═══
   The server puts the student's saved work into the page (window.MRC_BOOT), so
   there is no load-time round trip. start.js calls MRC_start() after every module
   (save, links, Claim/Evidence/Reasoning) has hooked in. */
function MRC_start() {
  var b = window.MRC_BOOT || {};
  var d = $('dashLink'); if (d && b.appUrl) d.href = b.appUrl;
  if (b.error || !b.user) {
    $('loadErr').textContent = b.error || 'Could not load your work. Refresh the page.';
    $('loadErr').style.display = 'block';
    var sp = document.querySelector('#loadScreen .spinner'); if (sp) sp.style.display = 'none';
    return;
  }
  var r = b.user;
  USER_EMAIL = r.email;
  if (r.status === 'submitted') {
    $('loadScreen').style.display = 'none';
    $('secDone').classList.add('on');
    $('doneEmail').textContent = r.email;
    return;
  }
  DATA = r.progress || {};
  SEC = r.currentSection || 0;
  if (r.returned) showReturned(r.returned);
  startApp();
}

/* A teacher sent this back for rework: show their note above everything. */
function showReturned(note) {
  var main = $('main');
  if (!main || $('returnedNote')) return;
  var el = document.createElement('div');
  el.id = 'returnedNote';
  el.className = 'returned no-print';
  var h = document.createElement('p');
  h.className = 'returned-h';
  h.textContent = 'Your teacher sent this back for rework';
  var n = document.createElement('p');
  n.className = 'returned-n';
  n.textContent = note;
  var f = document.createElement('p');
  f.className = 'returned-f';
  f.textContent = 'Use the tabs at the top to go back to any section. Fix what the note asks for, then submit again from the last page.';
  el.appendChild(h); el.appendChild(n); el.appendChild(f);
  main.insertBefore(el, main.firstChild);
}

/* ═══ APP STARTUP ═══ */
function startApp() {
  $('loadScreen').style.display = 'none';
  $('stickyHdr').style.display = 'block';
  // Sections are already in the HTML — just show the right one
  goSec(SEC);
}

/* ═══ NAVIGATION ═══ */
function goSec(n) {
  collectData(SEC);
  SEC = n;
  // Hide all sections
  var all = document.querySelectorAll('.sec');
  for (var i = 0; i < all.length; i++) all[i].classList.remove('on');
  // Show target
  var target = n >= TOTAL ? 'sSummary' : 's' + n;
  var el = $(target);
  if (el) el.classList.add('on');
  if (n >= TOTAL) buildSum();
  updateHdr();
  restoreSec(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  autoSave();
}

function updateHdr() {
  var n = Math.min(SEC, TOTAL);
  $('hBadge').textContent = SEC < TOTAL ? (SEC + 1) + '/' + TOTAL : 'Done';
  $('hProg').style.width = (n / TOTAL * 100) + '%';
  var t = '';
  for (var i = 0; i < TOTAL; i++) {
    var c = i === SEC ? 'tab on' : i < SEC ? 'tab done' : 'tab';
    var cl = i < SEC ? ' onclick="goSec(' + i + ')"' : '';
    t += '<div class="' + c + '"' + cl + '>' + SNAMES[i] + '</div>';
  }
  $('hTabs').innerHTML = t;
}

/* ═══ SAVE / LOAD ═══ */
// Saving is done by savesync.js, which replaces this function when it loads.
function autoSave() {}

function showSaved() {
  var el = document.querySelector('.save-ind');
  if (el) { el.textContent = 'Saved'; setTimeout(function() { el.textContent = ''; }, 2000); }
}

function collectData(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var keys = ['paycheck','banking','insurance','credit','loans','budget','reflection'];
  var key = keys[sec];
  if (!key) return;
  if (!DATA[key]) DATA[key] = {};

  // Named inputs
  var inputs = el.querySelectorAll('[data-key]');
  for (var i = 0; i < inputs.length; i++) DATA[key][inputs[i].dataset.key] = inputs[i].value;

  // Radio selections
  var rb = el.querySelectorAll('.rbtn.sel[data-rkey]');
  for (var i = 0; i < rb.length; i++) DATA[key][rb[i].dataset.rkey] = rb[i].dataset.rval;

  // Scenario selections
  var sc = el.querySelectorAll('.scenario.sel[data-rkey]');
  for (var i = 0; i < sc.length; i++) DATA[key][sc[i].dataset.rkey] = sc[i].dataset.rval;

  // Knowledge check answers
  var answers = [];
  var kc = el.querySelectorAll('.kc-q');
  for (var i = 0; i < kc.length; i++) {
    var q = kc[i].querySelector('.ql');
    var a = kc[i].querySelector('textarea');
    answers.push({ q: q ? q.textContent : '', a: a ? a.value : '' });
  }
  DATA[key].answers = answers;

  // Display values
  var di = el.querySelectorAll('[data-display]');
  for (var i = 0; i < di.length; i++) DATA[key][di[i].dataset.display] = di[i].textContent;
}

function restoreSec(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var keys = ['paycheck','banking','insurance','credit','loans','budget','reflection'];
  var key = keys[sec];
  if (!key || !DATA[key]) { checkDo(sec); checkGate(sec); return; }
  var d = DATA[key];

  // Restore inputs
  var inputs = el.querySelectorAll('[data-key]');
  for (var i = 0; i < inputs.length; i++) {
    if (d[inputs[i].dataset.key] !== undefined) inputs[i].value = d[inputs[i].dataset.key];
  }

  // Restore radios
  var rb = el.querySelectorAll('.rbtn[data-rkey]');
  for (var i = 0; i < rb.length; i++) {
    if (d[rb[i].dataset.rkey] === rb[i].dataset.rval) rb[i].classList.add('sel');
    else rb[i].classList.remove('sel');
  }

  // Restore scenarios
  var sc = el.querySelectorAll('.scenario[data-rkey]');
  for (var i = 0; i < sc.length; i++) {
    if (d[sc[i].dataset.rkey] === sc[i].dataset.rval) sc[i].classList.add('sel');
    else sc[i].classList.remove('sel');
  }

  // Restore textarea answers
  if (d.answers) {
    var ta = el.querySelectorAll('.kc-q textarea');
    for (var i = 0; i < d.answers.length; i++) {
      if (ta[i]) ta[i].value = d.answers[i].a || '';
    }
  }

  // Re-run calculators and checks
  if (sec === 0) calcPC();
  if (sec === 3) calcCC();
  if (sec === 4) calcLN();
  if (sec === 5) calcBG();
  updateWCs(sec);
  checkDo(sec);
  checkGate(sec);
}

/* ═══ UI UTILITIES ═══ */
function setRadio(btn) {
  var sibs = btn.parentElement.querySelectorAll('.rbtn');
  for (var i = 0; i < sibs.length; i++) sibs[i].classList.remove('sel');
  btn.classList.add('sel');
  if (btn.dataset.rkey === 'payType') {
    if ($('pHourly')) $('pHourly').style.display = btn.dataset.rval === 'hourly' ? 'block' : 'none';
    if ($('pSalary')) $('pSalary').style.display = btn.dataset.rval === 'salary' ? 'block' : 'none';
    calcPC();
  }
  checkDo(SEC); checkGate(SEC);
}

function pickScen(el) {
  var sibs = el.parentElement.querySelectorAll('.scenario');
  for (var i = 0; i < sibs.length; i++) sibs[i].classList.remove('sel');
  el.classList.add('sel');
  checkDo(SEC); checkGate(SEC);
}

/* ═══ VALIDATION ═══ */
function VN(id, correct, tol) {
  var el = document.querySelector('[data-key="' + id + '"]');
  var fb = $('fb_' + id);
  if (!el) return false;
  var v = parseFloat(el.value) || 0;
  if (!fb) return Math.abs(v - correct) <= (tol || 0.5);
  if (v === 0) { fb.textContent = ''; fb.className = 'fb'; return false; }
  if (Math.abs(v - correct) <= (tol || 0.5)) {
    fb.textContent = 'Correct!'; fb.className = 'fb ok'; return true;
  }
  fb.textContent = 'Not quite. Try again.'; fb.className = 'fb no'; return false;
}

/* ═══ WORD COUNTS ═══ */
function updateWC(ta) {
  var c = ta.nextElementSibling;
  if (!c || !c.classList.contains('wc')) return;
  var w = wc(ta.value);
  c.textContent = w + '/' + MW + ' words';
  if (w >= MW) c.classList.add('met'); else c.classList.remove('met');
}

function updateWCs(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var ta = el.querySelectorAll('.kc-q textarea');
  for (var i = 0; i < ta.length; i++) updateWC(ta[i]);
}

function onTA(ta, sec) { updateWC(ta); checkGate(sec); }

/* ═══ DO IT GATE (unlocks Think About It) ═══ */
function checkDo(sec) {
  var th = $('think' + sec);
  var lm = $('lockMsg' + sec);
  if (!th) return;

  var ok = false;
  if (sec === 0) ok = (window._net || 0) > 0;
  if (sec === 1) ok = VN('intCalc',22.5,.1) && VN('odCalc',125,1) && VN('bankA',144,1) && VN('bankB',180,1);
  if (sec === 2) {
    ok = VN('h1',1500,1) && VN('h2',6500,1) && VN('h3',1300,1) && VN('h4',2800,1) && VN('brkEven',17,1);
    var el = $('s2');
    if (el && !el.querySelector('.scenario.sel')) ok = false;
  }
  if (sec === 3) ok = VN('ccInt1',20,1) && VN('ccPrin1',5,.5);
  if (sec === 4) ok = VN('lnTotal',20496,50) && VN('lnInt',2496,50);
  if (sec === 5) ok = (window._total || 0) > 0 && checkNW();
  if (sec === 6) ok = true;

  if (ok) { th.classList.remove('locked'); if (lm) lm.style.display = 'none'; }
  else { th.classList.add('locked'); if (lm) lm.style.display = 'block'; }
}

/* ═══ NEXT GATE (unlocks Next button) ═══ */
function checkGate(sec) {
  checkDo(sec);
  var btn = $('gate' + sec);
  if (!btn) return;
  var el = $('s' + sec);
  if (!el) { btn.disabled = true; return; }

  var ta = el.querySelectorAll('.kc-q textarea');
  var allW = true;
  for (var i = 0; i < ta.length; i++) { if (wc(ta[i].value) < MW) allW = false; }

  var th = $('think' + sec);
  var doOk = !th || !th.classList.contains('locked');

  btn.disabled = !(allW && doOk);
  var m = $('gateMsg' + sec);
  if (m) {
    if (!doOk) m.textContent = 'Complete Do It first.';
    else if (!allW) m.textContent = 'Each response needs ' + MW + '+ words.';
    else m.textContent = '';
  }
}

/* ═══ NEEDS vs WANTS CHECKER ═══ */
function checkNW() {
  var el = $('s5');
  if (!el) return false;
  var correct = {
    nw_rent:'need', nw_netflix:'want', nw_gas:'need', nw_concert:'want',
    nw_groceries:'need', nw_gym:'want', nw_electric:'need', nw_coffee:'want',
    nw_insurance:'need', nw_haircut:'want'
  };
  var allRight = true;
  for (var k in correct) {
    var sel = el.querySelector('.rbtn.sel[data-rkey="' + k + '"]');
    if (!sel || sel.dataset.rval !== correct[k]) allRight = false;
  }
  return allRight;
}

function checkNWfb() {
  var el = $('s5');
  if (!el) return;
  var correct = {
    nw_rent:'need', nw_netflix:'want', nw_gas:'need', nw_concert:'want',
    nw_groceries:'need', nw_gym:'want', nw_electric:'need', nw_coffee:'want',
    nw_insurance:'need', nw_haircut:'want'
  };
  for (var k in correct) {
    var btns = el.querySelectorAll('.rbtn[data-rkey="' + k + '"]');
    var sel = el.querySelector('.rbtn.sel[data-rkey="' + k + '"]');
    for (var i = 0; i < btns.length; i++) {
      if (sel && sel.dataset.rval === correct[k])
        btns[i].style.borderColor = btns[i].classList.contains('sel') ? 'var(--gn)' : '#ddd';
      else if (sel)
        btns[i].style.borderColor = btns[i].classList.contains('sel') ? 'var(--rd)' : '#ddd';
      else
        btns[i].style.borderColor = '#ddd';
    }
  }
  checkDo(5); checkGate(5);
}

/* ═══ CALCULATORS ═══ */

// Section 0: Paycheck
function calcPC() {
  var el = $('s0');
  if (!el) return;
  var ptBtn = el.querySelector('.rbtn.sel[data-rkey="payType"]');
  var pt = ptBtn ? ptBtn.dataset.rval : 'hourly';
  if ($('pHourly')) $('pHourly').style.display = pt === 'hourly' ? 'block' : 'none';
  if ($('pSalary')) $('pSalary').style.display = pt === 'salary' ? 'block' : 'none';

  var w = parseFloat((el.querySelector('[data-key="wage"]') || {}).value) || 0;
  var h = parseFloat((el.querySelector('[data-key="hours"]') || {}).value) || 0;
  var s = parseFloat((el.querySelector('[data-key="salary"]') || {}).value) || 0;
  var ga = pt === 'hourly' ? w * h * 52 : s;

  if (ga <= 0) { $('pcR').style.display = 'none'; checkDo(0); checkGate(0); return; }

  var gm = ga / 12, fd = fedTax(ga) / 12, st = ga * 0.025 / 12, fc = ga * 0.0765 / 12;
  var net = gm - fd - st - fc;
  $('pcR').style.display = 'block';
  $('pcG').textContent = fmt(gm);
  $('pcF').textContent = '-' + fmt(fd);
  $('pcS').textContent = '-' + fmt(st);
  $('pcC').textContent = '-' + fmt(fc);
  $('pcN').textContent = fmt(net);
  $('pcNB').textContent = fmt(net) + '/mo';
  $('pcSB').textContent = fmt(gm) + ' gross - ' + fmt(gm - net) + ' deductions';
  window._net = net;
  window._gross = gm;
  checkDo(0); checkGate(0);
}

// Section 3: Credit Card
function calcCC() {
  var el = $('s3');
  if (!el) return;
  var b = parseFloat((el.querySelector('[data-key="ccBal"]') || {}).value) || 0;
  var a = parseFloat((el.querySelector('[data-key="ccAPR"]') || {}).value) || 0;
  if (b <= 0) { $('ccR').style.display = 'none'; checkDo(3); checkGate(3); return; }

  $('ccR').style.display = 'block';
  var mp = Math.max(25, b * 0.02);
  var mn = creditCalc(b, a, mp), ex = creditCalc(b, a, mp + 50), ag = creditCalc(b, a, mp + 150);

  $('ccML').textContent = 'Min (' + fmtD(mp) + '/mo)';
  $('ccMT').textContent = fmtMo(mn.mo);
  $('ccMO').textContent = mn.tot === Infinity ? 'Never' : fmt(mn.tot);
  $('ccMI').textContent = mn.int === Infinity ? 'Never' : fmt(mn.int);
  $('ccEL').textContent = fmtD(mp + 50) + '/mo (+$50)';
  $('ccET').textContent = fmtMo(ex.mo);
  $('ccEO').textContent = fmt(ex.tot);
  $('ccES').textContent = (mn.int === Infinity ? 'All' : fmt(mn.int - ex.int)) + ' saved';
  $('ccAL').textContent = fmtD(mp + 150) + '/mo (+$150)';
  $('ccAT').textContent = fmtMo(ag.mo);
  $('ccAO').textContent = fmt(ag.tot);
  $('ccAS').textContent = (mn.int === Infinity ? 'All' : fmt(mn.int - ag.int)) + ' saved';

  if (mn.int !== Infinity)
    $('ccSL').innerHTML = 'Your ' + fmt(b) + ' costs <strong style="color:var(--rd)">' + fmt(mn.tot) + '</strong> at minimums.';
  else
    $('ccSL').innerHTML = '<strong style="color:var(--rd)">Minimums do not cover interest.</strong>';

  checkDo(3); checkGate(3);
}

// Section 4: Loans
function calcLN() {
  var el = $('s4');
  if (!el) return;
  var p = parseFloat((el.querySelector('[data-key="carPrice"]') || {}).value) || 0;
  var rA = (parseFloat((el.querySelector('[data-key="lnA"]') || {}).value) || 0) / 100 / 12;
  var rB = (parseFloat((el.querySelector('[data-key="lnB"]') || {}).value) || 0) / 100 / 12;
  if (p <= 0) return;

  var pmtA = rA > 0 ? p * rA / (1 - Math.pow(1 + rA, -48)) : p / 48;
  var pmtB = rB > 0 ? p * rB / (1 - Math.pow(1 + rB, -72)) : p / 72;

  $('lA').textContent = fmt(pmtA) + '/mo';
  $('lAT').textContent = fmt(pmtA * 48);
  $('lAI').textContent = fmt(pmtA * 48 - p);
  $('lB').textContent = fmt(pmtB) + '/mo';
  $('lBT').textContent = fmt(pmtB * 72);
  $('lBI').textContent = fmt(pmtB * 72 - p);
  $('lnD').textContent = 'Loan B is ' + fmt(pmtA - pmtB) + '/mo less but costs ' + fmt((pmtB*72-p) - (pmtA*48-p)) + ' more interest.';
  checkGate(4);
}

// Section 5: Budget
function calcBG() {
  var el = $('s5');
  if (!el) return;
  function gv(k) { var i = el.querySelector('[data-key="' + k + '"]'); return parseFloat(i ? i.value : 0) || 0; }

  var needs = gv('bRent') + gv('bTrans') + gv('bGroc') + gv('bPhone') + gv('bIns') + gv('bDebt');
  var wants = gv('bEat') + gv('bSubs') + gv('bEnt') + gv('bOther');
  var total = needs + wants;

  if (total <= 0) { $('bgR').style.display = 'none'; checkDo(5); checkGate(5); return; }
  $('bgR').style.display = 'block';

  var net = window._net || 1;
  $('bgNet').textContent = fmt(net) + '/mo';
  var rem = net - total;

  $('bgN').textContent = fmt(needs);
  $('bgNP').textContent = pct(needs / net * 100);
  $('bgNP').style.color = needs / net > 0.5 ? 'var(--rd)' : 'var(--gn)';
  $('bgW').textContent = fmt(wants);
  $('bgWP').textContent = pct(wants / net * 100);
  $('bgWP').style.color = wants / net > 0.3 ? 'var(--rd)' : 'var(--gn)';
  $('bgRM').textContent = fmt(rem);
  $('bgRM').style.color = rem >= 0 ? 'var(--gn)' : 'var(--rd)';
  $('bgRC').style.background = rem >= 0 ? '#E8F5E9' : '#FFEBEE';
  $('bgRS').textContent = rem >= 0 ? 'savings' : 'over';

  // Bars
  var items = [
    {l:'Housing',v:gv('bRent'),c:'var(--teal)'}, {l:'Transport',v:gv('bTrans'),c:'var(--teal)'},
    {l:'Groceries',v:gv('bGroc'),c:'var(--teal)'}, {l:'Phone',v:gv('bPhone'),c:'var(--teal)'},
    {l:'Insurance',v:gv('bIns'),c:'var(--teal)'}, {l:'Debt',v:gv('bDebt'),c:'var(--teal)'},
    {l:'Eating',v:gv('bEat'),c:'var(--or)'}, {l:'Subs',v:gv('bSubs'),c:'var(--or)'},
    {l:'Fun',v:gv('bEnt'),c:'var(--or)'}, {l:'Other',v:gv('bOther'),c:'var(--or)'}
  ];
  var bh = '';
  for (var i = 0; i < items.length; i++) {
    if (items[i].v > 0) {
      bh += '<div class="bar-row"><span class="bar-lbl">' + items[i].l + '</span><div class="bar-trk"><div class="bar-fill" style="width:' + Math.min(100, items[i].v / net * 100) + '%;background:' + items[i].c + '"><span>' + fmt(items[i].v) + '</span></div></div></div>';
    }
  }
  $('bgBR').innerHTML = bh;

  $('bgOV').style.display = rem < 0 ? 'block' : 'none';
  $('bgOV').innerHTML = '<strong>' + fmt(Math.abs(rem)) + ' over budget.</strong>';

  var np = needs/net*100, wp = wants/net*100, sp = Math.max(0,rem)/net*100;
  $('bgC1').innerHTML = 'Needs: ' + pct(np) + ' ' + (np <= 50 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Over</span>');
  $('bgC2').innerHTML = 'Wants: ' + pct(wp) + ' ' + (wp <= 30 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Over</span>');
  $('bgC3').innerHTML = 'Save: ' + pct(sp) + ' ' + (rem >= 0 && sp >= 20 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Under</span>');

  window._needs = needs; window._wants = wants; window._rem = rem; window._total = total;
  checkDo(5); checkGate(5);
}

/* ═══ SUMMARY (only dynamic section) ═══ */
function buildSum() {
  for (var i = 0; i < TOTAL; i++) collectData(i);
  var net = window._net || 0, tot = window._total || 0, rem = window._rem || 0;

  var h = '<div style="text-align:center;margin-bottom:16px">';
  h += '<h2 style="font-size:20px;font-weight:700">Financial Snapshot</h2>';
  h += '<p style="font-size:13px;color:var(--dg)">' + escH(USER_EMAIL) + ' - ' + new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) + '</p>';
  h += '<p style="font-size:11px;color:var(--dg)">Financial Mathematics Test-Out - The Excel Center</p></div>';

  var secs = [
    {k:'paycheck',t:'1. Paycheck'}, {k:'banking',t:'2. Banking'}, {k:'insurance',t:'3. Insurance'},
    {k:'credit',t:'4. Credit'}, {k:'loans',t:'5. Loans'}, {k:'budget',t:'6. Budget'}, {k:'reflection',t:'7. Reflection'}
  ];
  for (var s = 0; s < secs.length; s++) {
    var d = DATA[secs[s].k];
    h += '<div class="sum-card"><p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--teal);margin-bottom:6px">' + secs[s].t + '</p>';
    if (!d || !d.answers || d.answers.length === 0) {
      h += '<p style="font-size:12px;color:#aaa">Not completed</p>';
    } else {
      h += '<div class="sum-qa">';
      for (var a = 0; a < d.answers.length; a++) {
        h += '<p class="q">' + escH(d.answers[a].q || '') + '</p>';
        h += '<p class="a">' + escH(d.answers[a].a || '(none)') + '</p>';
      }
      h += '</div>';
    }
    h += '</div>';
  }

  if (net > 0) {
    h += '<div class="bot-line"><p class="bl">Bottom line</p>';
    h += '<p class="bb">' + fmt(net) + ' in, ' + fmt(tot) + ' out, ' + fmt(rem) + (rem >= 0 ? ' left' : ' short') + '</p>';
    h += '<p class="bs">' + (rem >= 0 ? pct(rem/net*100) + ' for savings' : 'Need ' + fmt(Math.abs(rem)) + '/mo in cuts') + '</p></div>';
  }

  h += '<div style="text-align:center;margin-bottom:14px" class="no-print">';
  h += '<button class="btn-submit" onclick="doSubmit()">Submit for Review</button>';
  h += '<p style="font-size:11px;color:var(--dg);margin-top:6px">Cannot edit after submitting.</p>';
  h += '<br><button class="btn-print" style="margin-top:8px" onclick="window.print()">Print</button></div>';
  h += '<div class="nav no-print"><button class="btn btn-s" onclick="goSec(6)">Back</button><div></div></div>';

  $('sumContent').innerHTML = h;
}

function doSubmit() {
  if (!confirm('Submit? Cannot undo.')) return;
  for (var i = 0; i < TOTAL; i++) collectData(i);
  google.script.run
    .withSuccessHandler(function(r) {
      if (r.submitted) { alert('Submitted!'); location.reload(); }
      else alert(r.error || 'Error');
    })
    .withFailureHandler(function(e) { alert(e.message); })
    .submitWork(JSON.stringify(DATA));
}
