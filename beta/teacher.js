/* Money Reality Check — built by tools/build.py from src/. Edit src/, not this file. */
/* page markup (from src/teacher/markup.html) */
document.getElementById("app").innerHTML = "<div class=\"wrap\">\n  <h1>\ud83d\udcb0 Money Reality Check</h1>\n  <p class=\"sub\">Teacher Dashboard</p>\n\n  <div id=\"listView\">\n    <div class=\"toolbar no-print\">\n      <button class=\"btn btn-s btn-sm\" onclick=\"loadStudents()\">\u21bb Refresh</button>\n      <a href=\"#\" id=\"studentViewLink\" target=\"_blank\" class=\"btn btn-s btn-sm\" style=\"text-decoration:none\">\ud83d\udc41 Student View</a>\n      <select id=\"filterStatus\" onchange=\"renderTable()\">\n        <option value=\"all\">All</option>\n        <option value=\"new\">Unused</option>\n        <option value=\"active\">In progress</option>\n        <option value=\"submitted\">Submitted</option>\n      </select>\n      <span class=\"count\" id=\"countLabel\"></span>\n    </div>\n    <div id=\"spinner\">Loading students...</div>\n    <table style=\"display:none\" id=\"tbl\">\n      <thead><tr><th>Student</th><th>Status</th><th>Section</th><th>Last Active</th><th>Submitted</th></tr></thead>\n      <tbody id=\"tbody\"></tbody>\n    </table>\n  </div>\n\n  <div id=\"viewer\">\n    <div class=\"viewer-hdr no-print\">\n      <button class=\"btn btn-s btn-sm\" onclick=\"closeViewer()\">\u2190 Back</button>\n      <div>\n        <span id=\"viewerEmail\" style=\"font-weight:700;color:var(--teal);margin-right:12px;font-size:14px\"></span>\n        <button class=\"btn btn-s btn-sm\" onclick=\"window.print()\">\ud83d\udda8\ufe0f Print</button>\n      </div>\n    </div>\n    <div id=\"viewerContent\"></div>\n  </div>\n</div>\n\n";

/* ── src/teacher/app.js ── */
/* ════════════════════════════════════════════════════════════════════
   Money Reality Check — teacher dashboard (teacher.js)

   Everything a student typed is escaped before it goes on the page, so an
   answer can never run as code in a teacher's browser (where it could read
   every other student's work).
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SNAMES = ['Paycheck', 'Banking', 'Insurance', 'Credit', 'Loans', 'Budget', 'Reflect'];
  var SECS = [
    { k: 'paycheck', t: '1. Paycheck' }, { k: 'banking', t: '2. Banking' }, { k: 'insurance', t: '3. Insurance' },
    { k: 'credit', t: '4. Credit Cards' }, { k: 'loans', t: '5. Loans & Debt' }, { k: 'budget', t: '6. Budget' },
    { k: 'reflection', t: '7. Reflection' }
  ];
  var BOOT = window.MRC_BOOT || {};
  var allStudents = [];
  var current = null;      // email open in the viewer

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function run(fn, args, ok, bad) {
    var r = google.script.run
      .withSuccessHandler(function (x) { ok(x || {}); })
      .withFailureHandler(function (e) { bad((e && e.message) || 'Could not reach the server.'); });
    r[fn].apply(r, args);
  }

  /* ── list ─────────────────────────────────────────────────────────── */
  var svl = $('studentViewLink');
  if (svl && BOOT.appUrl) svl.href = BOOT.appUrl + '?view=student';

  function loadStudents() {
    $('spinner').textContent = allStudents.length ? 'Refreshing...' : 'Loading students...';
    $('spinner').style.display = 'block';
    run('getStudentList', [], function (r) {
      if (r.error) { $('spinner').textContent = 'Error: ' + r.error; return; }
      allStudents = r.students || [];
      $('spinner').style.display = 'none';
      $('tbl').style.display = 'table';
      renderTable();
    }, function (msg) { $('spinner').textContent = 'Error: ' + msg; });
  }

  function statusBadge(s) {
    var cls = s.status === 'new' ? 'badge-new' : s.status === 'submitted' ? 'badge-submitted' : 'badge-active';
    var h = '<span class="badge ' + cls + '">' + esc(s.status) + '</span>';
    if (s.status === 'active' && s.returned) h += ' <span class="badge badge-returned" title="' + esc(s.returned) + '">sent back</span>';
    return h;
  }

  function renderTable() {
    var f = $('filterStatus').value;
    var list = f === 'all' ? allStudents : allStudents.filter(function (s) { return s.status === f; });
    $('countLabel').textContent = list.length + ' of ' + allStudents.length + ' students';
    var tbody = $('tbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:20px;color:#aaa">No students yet</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (s) {
      var sec = s.status === 'new' ? '—'
        : s.section >= SNAMES.length ? 'Done'
        : (s.section + 1) + '/' + SNAMES.length + ' ' + (SNAMES[s.section] || '');
      return '<tr>'
        + '<td class="email-cell" data-email="' + esc(s.email) + '" title="' + esc(s.email) + '" tabindex="0">' + esc(String(s.email).split('@')[0]) + '</td>'
        + '<td>' + statusBadge(s) + '</td>'
        + '<td style="font-size:12px">' + esc(sec) + '</td>'
        + '<td style="font-size:12px">' + esc(s.updated || '—') + '</td>'
        + '<td style="font-size:12px">' + esc(s.submitted || '—') + '</td>'
        + '</tr>';
    }).join('');
  }

  $('tbody').addEventListener('click', function (e) {
    var td = e.target.closest && e.target.closest('.email-cell');
    if (td) viewStudent(td.getAttribute('data-email'));
  });
  $('tbody').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var td = e.target.closest && e.target.closest('.email-cell');
    if (td) viewStudent(td.getAttribute('data-email'));
  });

  /* ── one student's work ───────────────────────────────────────────── */
  function viewStudent(email) {
    current = email;
    $('listView').style.display = 'none';
    $('viewer').style.display = 'block';
    $('viewerEmail').textContent = email;
    $('viewerContent').innerHTML = '<p style="color:var(--dg);text-align:center;padding:20px">Loading...</p>';
    run('getStudentWork', [email], function (d) {
      if (d.error) { $('viewerContent').innerHTML = '<p style="color:var(--rd)">' + esc(d.error) + '</p>'; return; }
      renderViewer(d);
    }, function (msg) { $('viewerContent').innerHTML = '<p style="color:var(--rd)">Error: ' + esc(msg) + '</p>'; });
  }

  // "[CLAIM] … [EVIDENCE] … [REASONING] …" -> three labeled lines; anything else as written.
  var CER = /^\s*\[CLAIM\] ?([\s\S]*?)\n\[EVIDENCE\] ?([\s\S]*?)\n\[REASONING\] ?([\s\S]*)$/;
  function answerHtml(a) {
    if (!a) return '<p class="a empty">(no response)</p>';
    var m = String(a).match(CER);
    if (!m) return '<p class="a">' + esc(a) + '</p>';
    var part = function (tag, label, txt) {
      return '<p class="cer-row"><span class="cer-tag cer-' + tag + '">' + label + '</span>'
        + (txt.trim() ? esc(txt.trim()) : '<span class="empty">(blank)</span>') + '</p>';
    };
    return '<div class="a">' + part('c', 'Claim', m[1]) + part('e', 'Evidence', m[2]) + part('r', 'Reasoning', m[3]) + '</div>';
  }

  function renderViewer(d) {
    var p = d.progress || {};
    var s = { status: d.status, returned: d.returned };
    var h = '<div style="margin-bottom:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">'
      + statusBadge(s)
      + (d.submitted ? '<span style="font-size:12px;color:var(--dg)">Submitted ' + esc(d.submitted) + '</span>' : '')
      + '<span style="font-size:12px;color:var(--dg)">Last active: ' + esc(d.updated || '—') + '</span></div>';

    if (d.returned) {
      h += '<div class="card returned-card"><p class="sl">' + (d.status === 'active' ? 'Sent back for rework' : 'Last note sent') + '</p>'
        + '<p style="font-size:13px;white-space:pre-wrap">' + esc(d.returned) + '</p></div>';
    }
    if (d.status === 'submitted') {
      h += '<div class="card no-print send-back"><p class="sl">Send back for rework</p>'
        + '<p style="font-size:12px;color:var(--dg);margin-bottom:6px">The student keeps all their work, sees your note at the top of the page, '
        + 'fixes it, and submits again.</p>'
        + '<textarea id="rbNote" rows="3" maxlength="1000" placeholder="Example: Section 3, question 2: your evidence needs a number from your work."></textarea>'
        + '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
        + '<button class="btn btn-p btn-sm" id="rbSend" type="button">Send back</button>'
        + '<span id="rbMsg" style="font-size:12px"></span></div></div>';
    }

    if (!p || !Object.keys(p).length) {
      h += '<div class="card"><p style="color:#aaa;text-align:center">No work recorded yet.</p></div>';
    } else {
      SECS.forEach(function (sec) {
        var sd = p[sec.k];
        h += '<div class="card"><p class="sl">' + esc(sec.t) + '</p>';
        if (!sd || !sd.answers || !sd.answers.length) {
          h += '<p style="font-size:12px;color:#aaa">Not completed</p>';
        } else {
          if (sd.netMonthly) h += '<p style="font-size:13px;margin-bottom:6px">Net monthly: <strong>' + esc(sd.netMonthly) + '</strong></p>';
          if (sd.autoChoice) h += '<p style="font-size:13px;margin-bottom:6px">Auto plan: <strong>' + esc(sd.autoChoice) + '</strong></p>';
          if (sd.healthCalc) h += '<p style="font-size:13px;margin-bottom:6px">Health scenario answer: <strong>$' + esc(sd.healthCalc) + '</strong></p>';
          if (sd.interestCalc) h += '<p style="font-size:13px;margin-bottom:6px">Interest calc answer: <strong>$' + esc(sd.interestCalc) + '</strong></p>';
          h += '<div class="qa">';
          sd.answers.forEach(function (a) {
            a = a || {};
            h += '<p class="q">' + esc(a.q || '') + '</p>' + answerHtml(a.a);
          });
          h += '</div>';
        }
        h += '</div>';
      });
    }
    $('viewerContent').innerHTML = h;

    var send = $('rbSend');
    if (send) send.addEventListener('click', function () {
      var note = $('rbNote').value.trim();
      var msg = $('rbMsg');
      if (!note) { msg.style.color = 'var(--rd)'; msg.textContent = 'Write a note so the student knows what to fix.'; return; }
      send.disabled = true; msg.style.color = 'var(--dg)'; msg.textContent = 'Sending...';
      run('returnStudent', [current, note], function (r) {
        if (r.error) { send.disabled = false; msg.style.color = 'var(--rd)'; msg.textContent = r.error; return; }
        loadStudents();
        viewStudent(current);
      }, function (m) { send.disabled = false; msg.style.color = 'var(--rd)'; msg.textContent = m; });
    });
  }

  function closeViewer() {
    $('viewer').style.display = 'none';
    $('listView').style.display = 'block';
    current = null;
  }

  // Used by the buttons in the page markup.
  window.loadStudents = loadStudents;
  window.renderTable = renderTable;
  window.closeViewer = closeViewer;

  if (BOOT.error) { $('spinner').textContent = BOOT.error; return; }
  loadStudents();
})();
