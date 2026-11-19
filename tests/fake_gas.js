/* A small stand-in for the Apps Script services Code.gs uses, so the real Code.gs and
 * Release.gs run in Node. Strict where Apps Script is strict: reading or writing past a
 * sheet's last column throws, like the real getRange does. */
'use strict';
const fs = require('fs');
const vm = require('vm');

function makeSheet(name, rows, maxCols) {
  const sh = {
    name, data: rows || [], maxCols: maxCols || 26, frozen: 0,
    getLastRow() { return this.data.length; },
    getMaxColumns() { return this.maxCols; },
    insertColumnsAfter(after, n) { this.maxCols += n; },
    appendRow(arr) { this.data.push(arr.slice()); if (arr.length > this.maxCols) this.maxCols = arr.length; return this; },
    setFrozenRows(n) { this.frozen = n; },
    setColumnWidth() {},
    getParent() { return { getSpreadsheetTimeZone: () => 'America/Phoenix' }; },
    getRange(r, c, nr, nc) {
      nr = nr || 1; nc = nc || 1;
      if (c < 1 || r < 1 || c + nc - 1 > sh.maxCols) throw new Error(`Range out of bounds: r${r} c${c} ${nr}x${nc} (max cols ${sh.maxCols})`);
      const cell = (i, j) => { const row = sh.data[r - 1 + i]; const v = row ? row[c - 1 + j] : undefined; return v === undefined || v === null ? '' : v; };
      const range = {
        getValues() { return Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => cell(i, j))); },
        getValue() { return cell(0, 0); },
        setValues(vals) {
          if (vals.length !== nr || vals.some(v => v.length !== nc)) throw new Error('setValues: dimensions do not match the range');
          vals.forEach((row, i) => { while (sh.data.length < r + i) sh.data.push([]); row.forEach((v, j) => { sh.data[r - 1 + i][c - 1 + j] = v; }); });
          return range;
        },
        setValue(v) { return range.setValues([[v]]); },
        setFontWeight() { return range; }, setBackground() { return range; }, setFontColor() { return range; },
        createTextFinder(text) {
          const f = { entire: false, cased: true,
            matchEntireCell(b) { f.entire = b; return f; }, matchCase(b) { f.cased = b; return f; },
            findNext() {
              for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) {
                let v = String(cell(i, j)), t = String(text);
                if (!f.cased) { v = v.toLowerCase(); t = t.toLowerCase(); }
                if (f.entire ? v === t : v.includes(t)) return { getRow: () => r + i };
              }
              return null;
            } };
          return f;
        }
      };
      return range;
    }
  };
  return sh;
}

function load({ codePath, releasePath, indexPath, pin, sheets }) {
  const state = { user: '', sheets: sheets || {}, flushed: 0, logs: [] };
  const ss = {
    getSheetByName: n => state.sheets[n] || null,
    insertSheet: n => (state.sheets[n] = makeSheet(n, [], 26))
  };
  const ctx = {
    console: { log: (...a) => state.logs.push(a.join(' ')), error: (...a) => state.logs.push('ERROR ' + a.join(' ')), warn: () => {} },
    Session: { getActiveUser: () => ({ getEmail: () => state.user }), getScriptTimeZone: () => 'America/Phoenix' },
    SpreadsheetApp: { getActiveSpreadsheet: () => ss, flush: () => { state.flushed++; } },
    LockService: { getScriptLock: () => ({ tryLock: () => true, waitLock: () => {}, releaseLock: () => {} }) },
    ScriptApp: { getService: () => ({ getUrl: () => 'https://script.google.com/macros/s/TEST/exec' }) },
    Utilities: { formatDate: (d, tz, p) => new Date(d).toISOString().slice(0, 16).replace('T', ' ') },
    HtmlService: {
      XFrameOptionsMode: { ALLOWALL: 'ALLOWALL', DEFAULT: 'DEFAULT' },
      createTemplateFromFile(name) {
        if (name !== 'Index') throw new Error('unexpected template ' + name);
        const t = {
          evaluate() {
            const src = fs.readFileSync(indexPath, 'utf8')
              .replace('<?!= BOOT ?>', () => t.BOOT)
              .replace('<?!= mrcRelease() ?>', () => ctx.mrcRelease());
            const out = { html: src, title: '', meta: {}, xfo: null,
              setTitle(s) { out.title = s; return out; }, addMetaTag(k, v) { out.meta[k] = v; return out; },
              setXFrameOptionsMode(m) { out.xfo = m; return out; }, getContent() { return out.html; } };
            return out;
          }
        };
        return t;
      },
      createHtmlOutputFromFile() { throw new Error('createHtmlOutputFromFile should not be used'); }
    },
    JSON, Math, Date, String, Number, Array, Object, isNaN, parseInt, RegExp, Error
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(codePath, 'utf8'), ctx, { filename: 'Code.gs' });
  let rel = fs.readFileSync(releasePath, 'utf8');
  rel = rel.replace('var LIVE_RELEASE = null;', 'var LIVE_RELEASE = ' + (pin === undefined ? 'null' : JSON.stringify(pin)) + ';');
  vm.runInContext(rel, ctx, { filename: 'Release.gs' });
  // Call a server function as a given user, the way google.script.run would (JSON in, JSON out).
  function call(user, fn, args) {
    state.user = user;
    if (typeof ctx[fn] !== 'function' || /_$/.test(fn)) throw new Error('no such server function: ' + fn);
    const r = ctx[fn].apply(null, JSON.parse(JSON.stringify(args || [])));
    // The real transport drops the whole reply if it holds a Date: make that a test failure.
    (function noDates(v, path) {
      if (v instanceof Date || Object.prototype.toString.call(v) === '[object Date]') throw new Error(fn + ' returned a Date at ' + path);
      if (v && typeof v === 'object') Object.keys(v).forEach(k => noDates(v[k], path + '.' + k));
    })(r, fn);
    return r === undefined ? null : JSON.parse(JSON.stringify(r));
  }
  function doGet(user, params) { state.user = user; return ctx.doGet({ parameter: params || {} }); }
  return { ctx, state, call, doGet, makeSheet };
}

module.exports = { load, makeSheet };
