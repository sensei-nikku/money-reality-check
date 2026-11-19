/* ════════════════════════════════════════════════════════════════════
   ResourcesJS — "Go deeper" links for Money Reality Check (student view)

   Bundled into student.js after savesync.js.
   No server file. Code.gs, StudentJS and saved work are not touched.

   Each section gets a "Go deeper" card at the end of its Learn block:
   textbook sections first, then videos, readings and tools. Each Do It
   block gets a "Stuck on the math?" line pointing to the textbook's
   worked examples. The summary and "already submitted" screens get a
   link to the full textbook.

   Edit the RES table below to change links. Textbook links are built
   from BOOK_BASE + section id; set BOOK_BASE to '' to hide all of them.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var BOOK_BASE = 'https://books.abovethewell.com/fm/';

  // Textbook sections used below: id -> [number, title] (from fm-textbook book.js)
  var BOOK = {
    'reading-your-pay-stub':           ['3.3',  'Reading a Pay Stub'],
    'how-income-tax-works':            ['4.1',  'How Income Tax Works'],
    'checking-accounts-and-overdraft': ['5.1',  'Checking Accounts'],
    'bank-fees':                       ['5.3',  'Bank Fees and Choosing an Account'],
    'savings-accounts':                ['5.4',  'Savings Accounts and Interest'],
    'emergency-funds':                 ['6.3',  'Emergency and Sinking Funds'],
    'what-a-budget-is':                ['7.1',  'What a Budget Is'],
    'budget-methods':                  ['7.2',  'Ways to Run a Budget'],
    'credit-scores':                   ['9.3',  'Credit Scores'],
    'credit-cards':                    ['10.1', 'How Credit Cards Work'],
    'payoff-time':                     ['10.3', 'Paying Down a Balance: Time and Total Cost'],
    'how-loans-work':                  ['11.1', 'How Loans Work'],
    'car-loans':                       ['11.2', 'Car Loans'],
    'predatory-lending':               ['11.5', 'Predatory Lending'],
    'repaying-debt':                   ['11.6', 'Managing and Repaying Debt'],
    'how-insurance-works':             ['12.1', 'How Insurance Works'],
    'auto-insurance':                  ['12.2', 'Auto Insurance'],
    'health-insurance':                ['12.4', 'Health Insurance']
  };

  var TC = 'Two Cents · PBS';

  // Index = section number (0 Paycheck … 6 Reflection).
  // t: book | video | read | tool.  min: runtime in minutes, if known.
  var RES = [
    { // 0 Paycheck
      stuck: ['how-income-tax-works'],
      items: [
        { t: 'book', id: 'reading-your-pay-stub' },
        { t: 'book', id: 'how-income-tax-works' },
        { t: 'video', title: 'How Do Tax Brackets Actually Work?', src: TC, min: 7,
          url: 'https://www.pbs.org/video/how-do-tax-brackets-actually-work-uxonke',
          why: 'What a higher bracket really does to your pay.' },
        { t: 'video', title: 'How Do Your Tax Dollars Get Spent?', src: TC, min: 5,
          url: 'https://www.pbs.org/video/how-do-your-tax-dollars-get-spent-zbnxjr',
          why: 'Where the money taken out of your check goes.' },
        { t: 'read', title: 'Social Security and Medicare Withholding Rates', src: 'IRS',
          url: 'https://www.irs.gov/taxtopics/tc751',
          why: 'The official FICA rates.' },
        { t: 'tool', title: 'Arizona Paycheck Calculator', src: 'SmartAsset',
          url: 'https://smartasset.com/taxes/arizona-paycheck-calculator',
          why: 'Run your own take-home pay.' }
      ]
    },
    { // 1 Banking
      stuck: ['bank-fees', 'savings-accounts'],
      items: [
        { t: 'book', id: 'checking-accounts-and-overdraft' },
        { t: 'book', id: 'bank-fees' },
        { t: 'book', id: 'savings-accounts' },
        { t: 'video', title: 'Should You Break Up With Your Big Bank?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/should-you-break-up-with-your-big-bank-27jodw',
          why: 'Big banks compared with the other places to keep your money.' },
        { t: 'video', title: 'Is Your Money Safe in a Bank?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/is-your-money-safe-in-a-bank-6epd7d',
          why: 'What protects your deposits if a bank fails.' },
        { t: 'read', title: "Customers Can Avoid Overdraft Fees, but Most Don't Know How", src: 'Pew Charitable Trusts',
          url: 'https://www.pewtrusts.org/en/research-and-analysis/articles/2018/03/21/customers-can-avoid-overdraft-fees-but-most-dont-know-how',
          why: 'How overdraft fees work and how to avoid them.' }
      ]
    },
    { // 2 Insurance
      stuck: ['health-insurance'],
      items: [
        { t: 'book', id: 'how-insurance-works' },
        { t: 'book', id: 'health-insurance' },
        { t: 'book', id: 'auto-insurance' },
        { t: 'video', title: 'Health Insurance Explained: The YouToons Have It Covered', src: 'KFF',
          url: 'https://kff.org/dba192c',
          why: 'Premiums, deductibles and coinsurance, in cartoons.' },
        { t: 'video', title: "I'm Young & Healthy, Can I Skip Health Insurance?", src: TC, min: 5,
          url: 'https://www.pbs.org/video/im-young-healthy-can-i-skip-health-insurance-h5oetd',
          why: 'The real risk of going without coverage.' },
        { t: 'video', title: '10 Ways to Lower Your Car Insurance Premiums', src: TC, min: 7,
          url: 'https://www.pbs.org/video/10-ways-to-lower-your-car-insurance-premiums-nim8a3',
          why: 'Ways to pay less for the same coverage.' }
      ]
    },
    { // 3 Credit Cards
      stuck: ['payoff-time'],
      items: [
        { t: 'book', id: 'credit-cards' },
        { t: 'book', id: 'payoff-time' },
        { t: 'book', id: 'credit-scores' },
        { t: 'video', title: 'How Are Credit Scores Calculated?', src: TC, min: 5,
          url: 'https://www.pbs.org/video/how-are-credit-scores-calculated-s6zjoc',
          why: 'The five things your score is built from.' },
        { t: 'video', title: "What's the Fastest Way to Pay Off Debt?", src: TC, min: 5,
          url: 'https://www.pbs.org/video/hacking-your-brain-to-get-out-of-debt-6kyrbi',
          why: 'Payoff strategies, and the psychology behind them.' },
        { t: 'read', title: 'How Is a Credit Card Minimum Payment Calculated?', src: 'Experian',
          url: 'https://www.experian.com/blogs/ask-experian/how-is-your-credit-card-minimum-payment-calculated',
          why: 'What sets your minimum payment.' },
        { t: 'read', title: 'How Do I Get and Keep a Good Credit Score?', src: 'CFPB',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-and-keep-a-good-credit-score-en-318/',
          why: "The government's short list of what helps." }
      ]
    },
    { // 4 Loans and Debt
      stuck: ['how-loans-work'],
      items: [
        { t: 'book', id: 'how-loans-work' },
        { t: 'book', id: 'car-loans' },
        { t: 'book', id: 'predatory-lending' },
        { t: 'book', id: 'repaying-debt' },
        { t: 'video', title: 'Is There Such a Thing as Good Debt?', src: TC, min: 7,
          url: 'https://www.pbs.org/video/is-there-such-a-thing-as-good-debt-6ofhtj',
          why: 'When borrowing pays off, and when it doesn’t.' },
        { t: 'video', title: 'Are Payday Loans Ever a Good Idea?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/are-payday-loans-ever-a-good-idea-wlg0p0/',
          why: 'What a payday loan really costs.' },
        { t: 'read', title: 'What Is a Truth-in-Lending Disclosure for an Auto Loan?', src: 'CFPB',
          url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-truth-in-lending-disclosure-for-an-auto-loan-en-787/',
          why: 'The form that shows a loan’s total cost.' },
        { t: 'read', title: 'What Is the Maximum Interest Rate for Auto Title Loans?', src: 'Arizona DIFI',
          url: 'https://difi.az.gov/faq/what-maximum-interest-rate-auto-title-loans',
          why: 'Arizona’s legal limits on title loans.' }
      ]
    },
    { // 5 Budget
      stuck: ['budget-methods'],
      items: [
        { t: 'book', id: 'what-a-budget-is' },
        { t: 'book', id: 'budget-methods' },
        { t: 'book', id: 'emergency-funds' },
        { t: 'video', title: 'Budgeting Basics!', src: TC,
          url: 'https://www.pbs.org/video/budgeting-basics-frsgla/',
          why: 'Where a budget starts.' },
        { t: 'video', title: 'Why You NEED an Emergency Fund!', src: TC,
          url: 'https://www.pbs.org/video/why-you-need-an-emergency-fund-m0uc67/',
          why: 'Why savings come before extra wants.' },
        { t: 'video', title: 'How Eating Out Keeps You Poor!', src: TC,
          url: 'https://www.pbs.org/video/how-eating-out-keeps-you-poor-d0qcmh/',
          why: 'How small spending adds up.' }
      ]
    },
    { // 6 Reflection
      title: 'Keep going after this',
      items: [
        { t: 'book', home: true },
        { t: 'read', title: 'You Now Have Permanent Access to Free Weekly Credit Reports', src: 'FTC',
          url: 'https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports',
          why: 'Check your own credit report for free, every week.' },
        { t: 'read', title: 'Free Tax Return Preparation for Qualifying Taxpayers', src: 'IRS',
          url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
          why: 'Free help filing your taxes (VITA), if you qualify.' }
      ]
    }
  ];

  var TAG = { book: 'Textbook', video: 'Video', read: 'Read', tool: 'Tool' };

  /* ── rendering ───────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function bookUrl(id) { return BOOK_BASE ? BOOK_BASE + (id ? id + '.html' : 'book.html') : ''; }

  function resolve(it) {
    if (it.t !== 'book') return it;
    if (!BOOK_BASE) return null;
    if (it.home) return { t: 'book', tag: 'Textbook', title: 'Financial Math: the full textbook', src: 'Free, no sign-in',
                          url: bookUrl(''), why: 'Every topic in this check-out, with worked examples.' };
    var b = BOOK[it.id]; if (!b) return null;
    return { t: 'book', tag: 'Textbook ' + b[0], title: b[1], url: bookUrl(it.id) };
  }

  function row(it) {
    var r = resolve(it); if (!r || !r.url) return '';
    var meta = [r.src, r.min ? r.min + ' min' : ''].filter(Boolean).join(' · ');
    if (r.why) meta += (meta ? ' — ' : '') + r.why;
    return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">'
      + '<span class="rx-tag rx-' + r.t + '">' + esc(r.tag || TAG[r.t]) + '</span>'
      + '<span class="rx-t">' + esc(r.title) + '</span>'
      + (meta ? '<span class="rx-meta">' + esc(meta) + '</span>' : '')
      + '</a></li>';
  }

  function card(sec, solo) {
    var d = RES[sec]; if (!d) return null;
    var rows = d.items.map(row).join('');
    if (!rows) return null;
    var el = document.createElement('div');
    el.className = 'rx-card no-print' + (solo ? ' rx-solo' : ' sub');
    el.setAttribute('data-rx', String(sec));
    el.innerHTML = '<p class="rx-h">' + esc(d.title || 'Go deeper') + '</p>'
      + '<p class="rx-note">Optional. The textbook has worked examples and practice. Links open in a new tab, so this page stays open.</p>'
      + '<ul class="rx-list">' + rows + '</ul>';
    return el;
  }

  function stuckLine(sec) {
    var d = RES[sec]; if (!d || !d.stuck || !BOOK_BASE) return null;
    var links = d.stuck.filter(function (id) { return BOOK[id]; }).map(function (id) {
      return '<a href="' + esc(bookUrl(id)) + '" target="_blank" rel="noopener noreferrer">Textbook '
        + esc(BOOK[id][0]) + ': ' + esc(BOOK[id][1]) + '</a>';
    });
    if (!links.length) return null;
    var el = document.createElement('p');
    el.className = 'rx-stuck no-print';
    el.setAttribute('data-rx-stuck', String(sec));
    el.innerHTML = '<strong>Stuck on the math?</strong> Worked examples: ' + links.join(' · ');
    return el;
  }

  function homeCard(key) {
    if (!BOOK_BASE) return null;
    var el = document.createElement('div');
    el.className = 'rx-card rx-solo no-print';
    el.setAttribute('data-rx', key);
    el.innerHTML = '<p class="rx-h">Keep learning</p>'
      + '<ul class="rx-list">' + row({ t: 'book', home: true }) + '</ul>';
    return el;
  }

  /* ── placement (idempotent; safe to call on every navigation) ────── */
  function q(root, sels) {
    for (var i = 0; i < sels.length; i++) {
      try { var e = root.querySelector(sels[i]); if (e) return e; } catch (x) {}
    }
    return null;
  }

  function placeSection(n) {
    var sec = document.getElementById('s' + n);
    if (!sec || !RES[n]) return;

    if (!sec.querySelector('[data-rx="' + n + '"]')) {
      var learn = document.getElementById('learn' + n) || q(sec, ['.b-learn', '[id^="learn"]']);
      var c;
      if (learn && (c = card(n, false))) {
        learn.appendChild(c);
      } else if ((c = card(n, true))) {
        var h = sec.querySelector('h2');
        var firstBlock = sec.querySelector('.block');
        if (firstBlock && firstBlock.nextSibling) firstBlock.parentNode.insertBefore(c, firstBlock.nextSibling);
        else if (h && h.nextSibling) h.parentNode.insertBefore(c, h.nextSibling);
        else sec.insertBefore(c, sec.firstChild);
      }
    }

    if (!sec.querySelector('[data-rx-stuck="' + n + '"]')) {
      var doit = document.getElementById('do' + n) || document.getElementById('doit' + n)
              || q(sec, ['.b-do', '.b-doit', '.b-prove']);
      var s = doit && stuckLine(n);
      if (s) {
        var title = doit.querySelector('.bt');
        if (title && title.parentNode === doit) doit.insertBefore(s, title.nextSibling);
        else doit.insertBefore(s, doit.firstChild);
      }
    }
  }

  function placeAll() {
    for (var i = 0; i < RES.length; i++) {
      try { placeSection(i); } catch (e) { console.warn('[Resources] section ' + i, e); }
    }
    [['sSummary', 'summary'], ['secDone', 'done']].forEach(function (p) {
      var host = document.getElementById(p[0]);
      if (host && !host.querySelector('[data-rx="' + p[1] + '"]')) {
        var c = homeCard(p[1]); if (c) host.appendChild(c);
      }
    });
  }

  /* ── styles ──────────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    '.rx-card{margin-top:12px;color:#1A1A2E}' +
    '.rx-solo{background:#fff;border-left:4px solid #2B7A78;border-radius:8px;padding:12px 14px;margin:12px 0;' +
      'box-shadow:0 1px 3px rgba(0,0,0,.08)}' +
    '.rx-h{margin:0 0 2px;font-size:15px;font-weight:700;color:#2B7A78}' +
    '.rx-note{margin:0 0 6px;font-size:12px;color:#666}' +
    '.rx-list{list-style:none;margin:0;padding:0}' +
    '.rx-list li{border-top:1px solid #eee}' +
    '.rx-list li:first-child{border-top:0}' +
    '.rx-list a{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;padding:9px 0;' +
      'text-decoration:none;color:#1A1A2E}' +
    '.rx-list a:hover .rx-t,.rx-list a:focus .rx-t{text-decoration:underline}' +
    '.rx-t{font-weight:600;font-size:14px;line-height:1.35}' +
    '.rx-meta{flex-basis:100%;font-size:12px;line-height:1.4;color:#555}' +
    '.rx-tag{flex:none;font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;' +
      'padding:2px 6px;border-radius:4px;white-space:nowrap}' +
    '.rx-book{background:#2B7A78;color:#fff}' +
    '.rx-video{background:#B45309;color:#fff}' +
    '.rx-read{background:#E8F5F4;color:#1F5E5C}' +
    '.rx-tool{background:#FFF3E6;color:#92400E}' +
    '.rx-stuck{display:block;background:#fff;color:#1A1A2E;border-radius:6px;padding:8px 10px;' +
      'margin:6px 0 10px;font-size:13px;line-height:1.45}' +
    '.rx-stuck a{color:#2B7A78;font-weight:700}' +
    '@media print{.rx-card,.rx-stuck{display:none!important}}';
  document.head.appendChild(css);

  /* ── hooks ───────────────────────────────────────────────────────── */
  // Sections may be built in HTML or by startApp(); goSec() always runs after
  // they exist, so place on every navigation (cheap, idempotent).
  if (typeof window.goSec === 'function') {
    var origGoSec = window.goSec;
    window.goSec = function () {
      var r = origGoSec.apply(this, arguments);
      try { placeAll(); } catch (e) { console.warn('[Resources]', e); }
      return r;
    };
  }
  try { placeAll(); } catch (e) { console.warn('[Resources]', e); }
})();
