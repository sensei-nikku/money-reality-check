# Money Reality Check — test-out tool

A Google Apps Script web app for students testing out of Financial Math. The Apps Script project
holds **sign-in, the Submissions sheet, the teacher gate and the release pin**; the pages students
and teachers run live here, frozen and hash-pinned. Same split as The Long Run (`stock-sim`).

| Where | What | Who changes it |
|---|---|---|
| Apps Script `Index` (HTML) | Shell: injects the saved work + the pinned release, loads the files with hash checks | Pasted once (copy: `apps-script/Index.html`) |
| Apps Script `Release` (script) | **The pin**: release id, commit, SHA-384 of every file | Pasted per release (copy: `apps-script/Release.gs`) |
| Apps Script `Code.gs` | Sign-in, saves, submit, dashboard data, send-back | Apps Script only. **Not in this public repo** (it lists staff emails) |
| `src/` | The pages: student (markup, app, save, links, Claim/Evidence/Reasoning) and teacher dashboard | Edit here |
| `beta/` | Built from `src/` by `tools/build.py`. **Nothing loads it.** | Rebuild freely |
| `releases/<id>/` | Frozen builds. Never edited after pinning; a change = a new id | `tools/make_release.py` |
| `fonts/` | DM Sans (OFL), embedded in `teacher.css` | — |

Nothing on GitHub reaches anyone until a new `Release.gs` is pasted (that reaches `/dev`) and a new
deployment version is made (that reaches students). Student work never leaves the Google Sheet.

## Releasing
1. Edit `src/`, then `python3 tools/build.py`.
2. Run the tests (below).
3. `python3 tools/make_release.py beta <id>`; commit and push the folder.
4. `python3 tools/make_release.py --pin <id>`; that JSON replaces `null` on the `LIVE_RELEASE` line of `Release.gs`.
5. Paste Release.gs into Apps Script, check the `/dev` link (Deploy → Test deployments; add `?view=student`
   for the student page), then Deploy → Manage deployments → pencil → New version.
   Rollback = Manage deployments → pick the previous version. That restores Code.gs and the pin together;
   a server and a client only work as a matched pair, so never roll back by swapping the pin alone.

## Sheet
`Email | Status | Section | Progress | Created | Updated | Submitted | Rev | Returned`. Rev and Returned are
added automatically the first time the new Code.gs runs. Section is the furthest section reached (7 = summary).
Status goes new → active → submitted, and back to active when a teacher sends work back for rework.

## Tests
`MRC_SRC=<folder holding Code.gs> node tests/e2e.js` runs the real Code.gs and Release.gs in Node
(`tests/fake_gas.js` stands in for Google's services) behind the real `Index.html`, loading the pinned
files with SRI in Chromium (Playwright). It covers the full student run, interim saves, reloads,
stale tabs, the Claim/Evidence/Reasoning gates, submit, the dashboard, send-back, script injection
attempts on both pages, and the release gate failing closed. `MRC_FILES=releases/<id>` tests a frozen
release instead of `beta/`; `SHOTS=<dir>` saves screenshots.

## Releases
| Id | What |
|---|---|
| `2026-11-19-v1` | First hybrid release: interim save, Go deeper links, Claim/Evidence/Reasoning, escaped dashboard, send back for rework. Needs the Nov 19 Code.gs. |
