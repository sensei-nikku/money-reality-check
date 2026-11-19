"""Build beta/ from src/: the four files a release is made of.

    python3 tools/build.py            # src/ -> beta/student.css, student.js, teacher.css, teacher.js

student.js = the page markup, then app.js, savesync.js, resources.js, cer.js, start.js (order matters:
every module hooks in before start.js calls MRC_start()). teacher.css carries DM Sans inline, so
nothing is fetched from Google and the stylesheet's hash covers the fonts too.
"""
import base64, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT, FONTS = ROOT / 'src', ROOT / 'beta', ROOT / 'fonts'
STUDENT_JS = ['app.js', 'savesync.js', 'resources.js', 'cer.js', 'start.js']


def read(p):
    return p.read_text(encoding='utf-8')


def markup_js(path):
    html = read(path)
    return ('/* page markup (from %s) */\n'
            'document.getElementById("app").innerHTML = %s;\n' % (path.relative_to(ROOT), json.dumps(html)))


def fonts_css():
    out = []
    for w in (400, 500, 600, 700):
        b64 = base64.b64encode((FONTS / f'dm-sans-latin-{w}-normal.woff2').read_bytes()).decode()
        out.append("@font-face{font-family:'DM Sans';font-style:normal;font-weight:%d;font-display:swap;"
                   "src:url(data:font/woff2;base64,%s) format('woff2')}" % (w, b64))
    return '/* DM Sans, SIL Open Font License 1.1 (fonts/OFL-dm-sans.txt) */\n' + '\n'.join(out) + '\n'


def build():
    OUT.mkdir(exist_ok=True)
    head = '/* Money Reality Check — built by tools/build.py from src/. Edit src/, not this file. */\n'
    parts = [head, markup_js(SRC / 'student' / 'markup.html')]
    for f in STUDENT_JS:
        parts.append('\n/* ── src/student/%s ── */\n' % f + read(SRC / 'student' / f) + '\n;\n')
    (OUT / 'student.js').write_text(''.join(parts), encoding='utf-8')
    (OUT / 'student.css').write_text(head + read(SRC / 'student' / 'styles.css'), encoding='utf-8')
    (OUT / 'teacher.js').write_text(head + markup_js(SRC / 'teacher' / 'markup.html')
                                    + '\n/* ── src/teacher/app.js ── */\n' + read(SRC / 'teacher' / 'app.js'), encoding='utf-8')
    (OUT / 'teacher.css').write_text(head + fonts_css() + read(SRC / 'teacher' / 'styles.css'), encoding='utf-8')
    for f in sorted(OUT.iterdir()):
        print(f'{f.relative_to(ROOT)}  {f.stat().st_size:,} bytes')


if __name__ == '__main__':
    build()
