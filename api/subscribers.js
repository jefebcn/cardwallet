'use strict';
const { verifyToken, parseCookies, COOKIE } = require('../lib/auth');

function parseCSV(text) {
  const out = [];
  let row = [], field = '', i = 0, q = false, c;
  while (i < text.length) {
    c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); out.push(row); row = []; field = ''; }
      else if (c !== '\r') field += c;
    }
    i++;
  }
  if (field.length || row.length) { row.push(field); out.push(row); }
  return out.filter(function (r) { return r.some(function (x) { return String(x).trim() !== ''; }); });
}

module.exports = async function (req, res) {
  const secret = process.env.SESSION_SECRET || '';
  const cookies = parseCookies(req);

  if (!secret || !verifyToken(cookies[COOKIE], secret)) {
    res.status(401).json({ error: 'Non autorizzato' });
    return;
  }

  const url = process.env.SHEET_CSV_URL || '';
  if (!url) {
    res.status(200).json({ headers: [], rows: [], configured: false });
    return;
  }

  try {
    const r = await fetch(url, { redirect: 'follow' });
    if (!r.ok) throw new Error(String(r.status));
    const text = await r.text();
    const data = parseCSV(text);
    const headers = data[0] || [];
    const rows = data.slice(1);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ headers: headers, rows: rows, configured: true });
  } catch (e) {
    res.status(502).json({ error: 'Impossibile leggere il foglio. Verifica SHEET_CSV_URL (pubblicato in formato CSV).' });
  }
};
