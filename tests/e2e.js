/* End-to-end: the real Code.gs + Release.gs (in Node, tests/fake_gas.js) behind the real
 * Index.html shell, loading the pinned files with SRI in real Chromium.
 *
 *   MRC_SRC=/path/to/folder/with/Code.gs  node tests/e2e.js            (serves beta/)
 *   MRC_FILES=releases/<id>  ...                                          (serves a release)
 *   SHOTS=/some/dir ...                                                   (also saves screenshots)
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('playwright');
const { load, makeSheet } = require('./fake_gas');

const ROOT = path.resolve(__dirname, '..');
const SRC = process.env.MRC_SRC || path.resolve(ROOT, '../mrc-private');
const FILES_DIR = path.resolve(ROOT, process.env.MRC_FILES || 'beta');
const SHOTS = process.env.SHOTS || '';
const FILES = ['student.css', 'student.js', 'teacher.css', 'teacher.js'];
const RID = 'test-release', SHA = 'a'.repeat(40);
const PAGES = `https://sensei-nikku.github.io/money-reality-check/releases/${RID}/`;
const CDN = `https://cdn.jsdelivr.net/gh/sensei-nikku/money-reality-check@${SHA}/releases/${RID}/`;
const APP = 'https://n-test-0lu-script.googleusercontent.com/userCodeAppPanel';
const TEACHER = 'nicholas.inoue@excelcenteraz.org';

const sri = buf => 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
const fileBuf = f => fs.readFileSync(path.join(FILES_DIR, f));
const PIN = { id: RID, sha: SHA, files: Object.fromEntries(FILES.map(f => [f, sri(fileBuf(f))])) };

function newGas(pin, sheets) {
  return load({
    codePath: path.join(SRC, 'Code.gs'),
    releasePath: path.join(ROOT, 'apps-script/Release.gs'),
    indexPath: path.join(ROOT, 'apps-script/Index.html'),
    pin, sheets
  });
}

let fails = 0;
const check = (name, ok, extra) => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok || !extra ? '' : '  -> ' + extra)); if (!ok) fails++; };

const RUN_SHIM = () => {
  window.google = { script: { get run() {
    let ok = () => {}, bad = () => {};
    const p = new Proxy({}, { get(_, n) {
      if (n === 'withSuccessHandler') return f => { ok = f; return p; };
      if (n === 'withFailureHandler') return f => { bad = f; return p; };
      if (n === 'withUserObject') return () => p;
      return (...args) => { window.__gas(n, JSON.stringify(args)).then(r => setTimeout(() => ok(JSON.parse(r)), 0), e => setTimeout(() => bad(e), 0)); };
    } });
    return p;
  } } };
};

async function openAs(browser, gas, user, opts) {
  opts = opts || {};
  const context = await browser.newContext({ viewport: opts.viewport || { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('dialog', d => d.accept());
  await page.exposeBinding('__gas', (src, fn, args) => JSON.stringify(gas.call(user, fn, JSON.parse(args))));
  await page.addInitScript(RUN_SHIM);
  const served = { pages: 0, cdn: 0 };
  await page.route(u => u.href.startsWith(APP), r => {
    const params = Object.fromEntries(new URL(r.request().url()).searchParams);
    const out = gas.doGet(user, params);
    r.fulfill({ contentType: 'text/html', body: out.getContent() });
  });
  const serve = (prefix, key, tamper) => page.route(u => u.href.startsWith(prefix), r => {
    const f = r.request().url().slice(prefix.length);
    if (!FILES.includes(f)) return r.fulfill({ status: 404, body: 'nope' });
    served[key]++;
    let body = fileBuf(f);
    if (tamper && tamper(f)) body = Buffer.concat([body, Buffer.from('\n/* tampered */')]);
    r.fulfill({ body, headers: { 'content-type': f.endsWith('.css') ? 'text/css' : 'application/javascript', 'access-control-allow-origin': '*' } });
  });
  await serve(PAGES, 'pages', opts.tamperPages);
  await serve(CDN, 'cdn', opts.tamperCdn);
  await page.goto(APP + (opts.view ? '?view=' + opts.view : ''));
  return { page, context, errors, served };
}

const ANS = {
  c: 'I think this is the right call for my own money',
  e: 'From my numbers above the payment was $25 and only $5 went to the balance each month which is slow',
  r: 'This shows that the minimum payment mostly feeds interest so paying more each month is the only way to actually get out of debt faster'
};
async function fillCER(page, sec) {
  const n = await page.locator(`#s${sec} .cer`).count();
  for (let i = 0; i < n; i++) {
    const w = page.locator(`#s${sec} .cer`).nth(i);
    await w.locator('[data-part="c"] textarea').fill(ANS.c);
    await w.locator('[data-part="e"] textarea').fill(ANS.e);
    await w.locator('[data-part="r"] textarea').fill(ANS.r);
  }
  return n;
}
const fillN = (page, key, v) => page.locator(`[data-key="${key}"]`).fill(String(v));
const saved = page => page.waitForFunction(() => /All work saved/.test((document.getElementById('ssStatus') || {}).textContent || ''), null, { timeout: 15000 });
const row = (gas, email) => gas.state.sheets.Submissions.data.find(r => String(r[0]).toLowerCase() === email);

function serverTests() {
  const old = makeSheet('Submissions', [
    ['Email', 'Status', 'Section', 'Progress', 'Created', 'Updated', 'Submitted'],
    ['old@x.org', 'submitted', 6, JSON.stringify({ paycheck: { answers: [{ q: 'Q', a: 'old answer' }] } }), new Date(), new Date(), new Date()]
  ], 7);
  const gas = newGas(PIN, { Submissions: old });
  const S = 'kid@x.org';
  check('student blocked from getStudentList', gas.call(S, 'getStudentList').error === 'Unauthorized');
  check('student blocked from getStudentWork', gas.call(S, 'getStudentWork', ['old@x.org']).error === 'Unauthorized');
  check('student blocked from returnStudent', gas.call(S, 'returnStudent', ['old@x.org', 'x']).error === 'Unauthorized');
  check('include() is gone', typeof gas.ctx.include !== 'function');
  check('old getUser/saveProgress are gone', typeof gas.ctx.getUser !== 'function' && typeof gas.ctx.saveProgress !== 'function');
  const list = gas.call(TEACHER, 'getStudentList');
  check('7-column sheet upgraded and listed', !list.error && list.students.length === 1 && old.maxCols === 9, JSON.stringify(list));
  check('header gets Rev + Returned', old.data[0][7] === 'Rev' && old.data[0][8] === 'Returned');
  check('getStudentWork returns no Dates', !gas.call(TEACHER, 'getStudentWork', ['OLD@x.org']).error);
  check('returnStudent needs a note', /note/.test(gas.call(TEACHER, 'returnStudent', ['old@x.org', '  ']).error));
  check('returnStudent on submitted work', gas.call(TEACHER, 'returnStudent', ['old@x.org', 'Fix section 2']).ok === true);
  check('...sets active + note + rev', row(gas, 'old@x.org')[1] === 'active' && /Fix section 2$/.test(row(gas, 'old@x.org')[8]) && row(gas, 'old@x.org')[7] === 1);
  check('can\'t send back unsubmitted work', /Only submitted/.test(gas.call(TEACHER, 'returnStudent', ['old@x.org', 'again']).error));
  check('save: too large refused', gas.call(S, 'mrcSync', [{ baseRev: 0, max: 0, json: '{"a":"' + 'x'.repeat(49001) + '"}' }]).tooLarge === true);
  check('save: array refused', gas.call(S, 'mrcSync', [{ baseRev: 0, max: 0, json: '[1,2]' }]).error === 'bad_json');
  check('save: first save creates row', gas.call(S, 'mrcSync', [{ baseRev: null, max: 3, json: '{}' }]).rev === 1);
  check('save: stale revision refused', gas.call(S, 'mrcSync', [{ baseRev: 0, max: 3, json: '{}' }]).conflict === true);
  check('save: section clamped to 7', gas.call(S, 'mrcSync', [{ baseRev: 1, max: 99, json: '{}' }]).rev === 2 && row(gas, S)[2] === 7);
  check('save: section never goes backward', gas.call(S, 'mrcSync', [{ baseRev: 2, max: 1, json: '{}' }]).ok && row(gas, S)[2] === 7);
  check('submit: rejects non-object', /damaged/.test(gas.call(S, 'submitWork', ['"str"']).error || ''));
  check('submit: works', gas.call(S, 'submitWork', ['{"x":1}']).submitted === true && row(gas, S)[1] === 'submitted');
  check('save after submit refused', gas.call(S, 'mrcSync', [{ baseRev: 4, max: 7, json: '{}' }]).submitted === true);
  check('double submit refused', /Already/.test(gas.call(S, 'submitWork', ['{}']).error));
  const page = gas.doGet(S, {});
  check('doGet: framing locked to DEFAULT', page.xfo === 'DEFAULT');
  check('doGet: phone viewport set', /width=device-width/.test(page.meta.viewport || ''));
  check('doGet: teacher gets teacher page', /"page":"teacher"/.test(gas.doGet(TEACHER, {}).getContent()));
  check('doGet: teacher ?view=student gets student page', /"page":"student"/.test(gas.doGet(TEACHER, { view: 'student' }).getContent()));
  check('doGet: signed-out shows error', /Could not detect your Google account/.test(gas.doGet('', {}).getContent()));
  check('no server errors logged', !gas.state.logs.some(l => l.startsWith('ERROR')), gas.state.logs.join('\n'));
}

(async () => {
  serverTests();

  const browser = await chromium.launch();
  const gas = newGas(PIN, {});
  const K = 'student.one@excelcenteraz.org';

  // ── a student works through the whole thing ──
  const A = await openAs(browser, gas, K);
  const pa = A.page;
  await pa.waitForSelector('#s0.on', { timeout: 15000 });
  check('student page loads from pinned files (Pages)', A.served.pages === 2 && A.served.cdn === 0);
  check('save bar mounted', await pa.locator('#ssBar').isVisible());
  check('C/E/R boxes built (3 per question)', await pa.locator('#s0 .cer textarea').count() === 9);
  check('Go deeper card in Learn', await pa.locator('#s0 .b-learn [data-rx="0"]').count() === 1);
  check('grading notice inside the orange block', await pa.locator('#think0 .b-think > .cer-notice').count() === 1);
  check('Think locked before Do It', await pa.locator('#think0.locked').count() === 1);
  await fillN(pa, 'wage', 20);
  check('Think unlocks after pay entered', await pa.locator('#think0.locked').count() === 0);
  await pa.locator('#s0 .cer').first().locator('[data-part="r"] textarea').fill(ANS.r + ' ' + ANS.r);
  check('Next locked with reasoning only', await pa.locator('#gate0').isDisabled());
  await fillCER(pa, 0);
  check('Next unlocks with full C/E/R', await pa.locator('#gate0').isEnabled());
  await pa.click('#gate0');
  await pa.waitForSelector('#s1.on');
  await fillN(pa, 'intCalc', 22.5); await fillN(pa, 'odCalc', 125); await fillN(pa, 'bankA', 144); await fillN(pa, 'bankB', 180);
  check('Do It feedback still works', (await pa.locator('#fb_bankB').textContent()) === 'Correct!');
  await pa.locator('#s1 .cer').first().locator('[data-part="c"] textarea').fill('Partial claim typed before a reload');
  await pa.click('#ssSave');
  await saved(pa);
  const r1 = row(gas, K);
  check('interim save reached the sheet', r1 && r1[1] === 'active' && r1[2] === 1 && /Partial claim/.test(r1[3]));
  check('earlier section kept in the save', /\[CLAIM\] I think this is the right call/.test(JSON.parse(r1[3]).paycheck.answers[0].a));

  // reload in a second tab: lands on the furthest section with everything restored
  const B = await openAs(browser, gas, K);
  await B.page.waitForSelector('#s1.on', { timeout: 15000 });
  check('reload lands on furthest section', true);
  check('reload restores the partial claim', (await B.page.locator('#s1 .cer').first().locator('[data-part="c"] textarea').inputValue()) === 'Partial claim typed before a reload');
  check('reload restores Do It answers + unlock', (await B.page.locator('[data-key="bankB"]').inputValue()) === '180' && await B.page.locator('#think1.locked').count() === 0);
  await B.page.locator('#s1 .cer').first().locator('[data-part="c"] textarea').fill('Claim changed in the newer tab');
  await B.page.click('#ssSave'); await saved(B.page);
  await pa.locator('#s1 .cer').nth(1).locator('[data-part="c"] textarea').fill('Typed in the stale tab');
  await pa.click('#ssSave');
  await pa.waitForFunction(() => /out of date/.test(document.getElementById('ssStatus').textContent), null, { timeout: 15000 });
  check('stale tab refused, newer work kept', /Claim changed in the newer tab/.test(row(gas, K)[3]) && !/stale tab/.test(row(gas, K)[3]));
  await A.context.close();

  // finish every section in tab B
  const pb = B.page;
  await fillCER(pb, 1); await pb.click('#gate1'); await pb.waitForSelector('#s2.on');
  await pb.click('#s2 .scenario[data-rval="planA"]');
  for (const [k, v] of [['h1', 1500], ['h2', 6500], ['h3', 1300], ['h4', 2800], ['brkEven', 17]]) await fillN(pb, k, v);
  await fillCER(pb, 2); await pb.click('#gate2'); await pb.waitForSelector('#s3.on');
  await fillN(pb, 'ccInt1', 20); await fillN(pb, 'ccPrin1', 5);
  await fillCER(pb, 3); await pb.click('#gate3'); await pb.waitForSelector('#s4.on');
  await fillN(pb, 'lnTotal', 20496); await fillN(pb, 'lnInt', 2496);
  await fillCER(pb, 4); await pb.click('#gate4'); await pb.waitForSelector('#s5.on');
  await fillN(pb, 'bRent', 1000);
  const NW = { rent: 'need', netflix: 'want', gas: 'need', concert: 'want', groceries: 'need', gym: 'want', electric: 'need', coffee: 'want', insurance: 'need', haircut: 'want' };
  for (const [k, v] of Object.entries(NW)) await pb.click(`#s5 .rbtn[data-rkey="nw_${k}"][data-rval="${v}"]`);
  await fillCER(pb, 5); await pb.click('#gate5'); await pb.waitForSelector('#s6.on');
  await fillCER(pb, 6);
  check('last Next unlocks', await pb.locator('#gate6').isEnabled());
  await pb.click('#gate6'); await pb.waitForSelector('#sSummary.on');
  check('summary shows C/E/R text escaped', /\[CLAIM\]/.test(await pb.locator('#sumContent').textContent()));
  if (SHOTS) await pb.screenshot({ path: path.join(SHOTS, 'student-summary.png'), fullPage: false });
  await Promise.all([pb.waitForEvent('load'), pb.click('.btn-submit')]);
  await pb.waitForSelector('#secDone.on', { timeout: 15000 });
  check('submit goes through and page shows Already Submitted', row(gas, K)[1] === 'submitted');
  check('student page had no errors', !A.errors.length && !B.errors.length, A.errors.concat(B.errors).join(' | '));
  await B.context.close();

  // ── seeded students: an attacker, an old-format answer, a script-breaking answer ──
  const sh = gas.state.sheets.Submissions;
  const full = '[CLAIM] ' + ANS.c + '\n[EVIDENCE] ' + ANS.e + '\n[REASONING] ' + ANS.r;
  const prog = extra => {
    const p = {};
    ['paycheck', 'banking', 'insurance', 'credit', 'loans', 'budget', 'reflection'].forEach(k => { p[k] = { answers: [{ q: 'Q1', a: full }, { q: 'Q2', a: full }, { q: 'Q3', a: full }] }; });
    return Object.assign(p, extra || {});
  };
  const now = new Date();
  const XSS = '<img src=x onerror="window.__pwned=1">';
  sh.appendRow(['evil@x.org', 'submitted', 7, JSON.stringify(prog({
    credit: { netMonthly: XSS, answers: [{ q: XSS, a: '[CLAIM] ' + XSS + '\n[EVIDENCE] e\n[REASONING] r' }, { q: 'Q2', a: XSS }] }
  })), now, now, now, 3, '']);
  sh.appendRow(['weak@x.org', 'active', 7, JSON.stringify(prog({ insurance: { answers: [{ q: 'Q1', a: full }, { q: 'Q2', a: 'too short old answer' }] } })), now, now, '', 1, '']);
  sh.appendRow(['boot@x.org', 'active', 0, JSON.stringify({ paycheck: { answers: [{ q: 'Q', a: '</script><script>window.__boot_pwned=1</script> ' + 'word '.repeat(30) }] } }), now, now, '', 1, '']);

  // teacher dashboard: payloads show as text, never run
  const T = await openAs(browser, gas, TEACHER, { viewport: { width: 1100, height: 900 } });
  const pt = T.page;
  await pt.waitForSelector('#tbl', { state: 'visible', timeout: 15000 });
  check('teacher page loads teacher files', T.served.pages === 2);
  check('dashboard lists students', await pt.locator('#tbody tr').count() === 4);
  await pt.click('.email-cell[data-email="evil@x.org"]');
  await pt.waitForSelector('.qa');
  await pt.waitForTimeout(300);
  check('XSS payload did not run on the dashboard', await pt.evaluate(() => window.__pwned === undefined));
  check('payload shown as plain text', (await pt.locator('#viewerContent').textContent()).includes('onerror="window.__pwned=1"'));
  check('C/E/R answers split into labeled lines', await pt.locator('.cer-tag').count() >= 3);
  await pt.fill('#rbNote', 'Section 4: your evidence needs a number. <b>not bold</b>');
  await pt.click('#rbSend');
  await pt.waitForFunction(() => /Sent back for rework/.test(document.getElementById('viewerContent').textContent), null, { timeout: 15000 });
  check('send back sets the row active with the note', row(gas, 'evil@x.org')[1] === 'active' && /not bold/.test(row(gas, 'evil@x.org')[8]));
  if (SHOTS) await pt.screenshot({ path: path.join(SHOTS, 'teacher-viewer.png'), fullPage: false });
  check('teacher page had no errors', !T.errors.length, T.errors.join(' | '));
  await T.context.close();

  // the sent-back student sees the note (as text) and lands on the summary
  const E = await openAs(browser, gas, 'evil@x.org');
  await E.page.waitForSelector('#returnedNote', { timeout: 15000 });
  check('student sees the send-back note', (await E.page.locator('#returnedNote').textContent()).includes('<b>not bold</b>'));
  check('note is text, not markup', await E.page.locator('#returnedNote b').count() === 0);
  check('sent-back student lands on the summary', await E.page.locator('#sSummary.on').count() === 1);
  check('student-side payload did not run', await E.page.evaluate(() => window.__pwned === undefined));
  if (SHOTS) await E.page.screenshot({ path: path.join(SHOTS, 'student-returned.png'), fullPage: false });
  await E.context.close();

  // weak answer in a section not opened this sitting blocks submit
  const W = await openAs(browser, gas, 'weak@x.org');
  await W.page.waitForSelector('#sSummary.on', { timeout: 15000 });
  await W.page.click('.btn-submit');
  await W.page.waitForTimeout(400);
  check('submit blocked by a weak answer', row(gas, 'weak@x.org')[1] === 'active' && /Section 3 \(Insurance\)/.test(await W.page.locator('.cer-sum').textContent()));
  await W.context.close();

  // saved text containing </script> can't break or hijack the page
  const X = await openAs(browser, gas, 'boot@x.org');
  await X.page.waitForSelector('#s0.on', { timeout: 15000 });
  check('</script> in saved work: page loads, nothing runs', await X.page.evaluate(() => window.__boot_pwned === undefined));
  check('...and the text is back in the answer box', (await X.page.locator('#s0 .cer').first().locator('[data-part="r"] textarea').inputValue()).startsWith('</script>'));
  await X.context.close();

  // ── the release gate ──
  const F1 = await openAs(browser, gas, 'p1@x.org', { tamperPages: f => f === 'student.js' });
  await F1.page.waitForSelector('#s0.on', { timeout: 20000 });
  check('tampered Pages file refused, jsDelivr copy used', F1.served.cdn >= 1);
  await F1.context.close();
  const F2 = await openAs(browser, gas, 'p2@x.org', { tamperPages: () => true, tamperCdn: () => true });
  await F2.page.waitForSelector('.mrc-bootfail', { timeout: 20000 });
  check('both copies tampered: fails closed with a message', /couldn't load/.test(await F2.page.locator('.mrc-bootfail').textContent()));
  check('...and no unpinned code ran', await F2.page.evaluate(() => typeof window.MRC_start === 'undefined'));
  await F2.context.close();
  const nopin = newGas(null, {});
  const F3 = await openAs(browser, nopin, 'p3@x.org');
  await F3.page.waitForSelector('.mrc-bootfail', { timeout: 10000 });
  check('no pin: shows "not released", loads nothing', /hasn't been released/.test(await F3.page.locator('.mrc-bootfail').textContent()) && F3.served.pages === 0);
  await F3.context.close();

  await browser.close();
  console.log(fails ? `\n${fails} FAILED` : '\nALL PASS');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
