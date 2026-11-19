"""Freeze beta/ into releases/<id>/ and print the pin for Release.gs.

    python3 tools/build.py                                  # src/ -> beta/
    python3 tools/make_release.py beta 2026-12-08-v1        # copy + hash
    git add releases/2026-12-08-v1 && git commit && git push
    python3 tools/make_release.py --pin 2026-12-08-v1       # after the push: the LIVE_RELEASE line

A release folder is never edited after it's pinned; make a new id instead.
"""
import base64, hashlib, json, pathlib, shutil, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ['student.css', 'student.js', 'teacher.css', 'teacher.js']


def sri(path):
    return 'sha384-' + base64.b64encode(hashlib.sha384(path.read_bytes()).digest()).decode()


def freeze(channel, rid):
    dst = ROOT / 'releases' / rid
    if dst.exists():
        sys.exit(f'releases/{rid} already exists; releases are immutable, pick a new id')
    dst.mkdir(parents=True)
    for f in FILES:
        shutil.copyfile(ROOT / channel / f, dst / f)
    (dst / 'HASHES.json').write_text(json.dumps({f: sri(dst / f) for f in FILES}, indent=2) + '\n')
    print(f'froze {channel}/ -> releases/{rid}/')


def pin(rid):
    d = ROOT / 'releases' / rid
    hashes = {f: sri(d / f) for f in FILES}
    stored = json.loads((d / 'HASHES.json').read_text())
    assert hashes == stored, 'release files changed since they were frozen'
    rel = str(d.relative_to(ROOT))
    sha = subprocess.check_output(['git', 'log', '-1', '--format=%H', '--', rel], cwd=ROOT, text=True).strip()
    dirty = subprocess.check_output(['git', 'status', '--porcelain', '--', rel], cwd=ROOT, text=True).strip()
    assert sha and not dirty, 'commit and push the release folder first'
    print(json.dumps({'id': rid, 'sha': sha, 'files': hashes}, separators=(',', ':')))


if __name__ == '__main__':
    if sys.argv[1] == '--pin':
        pin(sys.argv[2])
    else:
        freeze(sys.argv[1], sys.argv[2])
