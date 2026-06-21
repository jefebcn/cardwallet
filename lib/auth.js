/* Utility di autenticazione condivise dalle funzioni /api
   Cookie di sessione firmato HMAC-SHA256 (HttpOnly). Nessuna dipendenza. */
'use strict';
const crypto = require('crypto');

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function makeToken(secret, days) {
  days = days || 7;
  const exp = Date.now() + days * 86400000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url');
  return payload + '.' + sign(payload, secret);
}

function verifyToken(token, secret) {
  if (!token || token.indexOf('.') < 0) return false;
  const parts = token.split('.');
  const payload = parts[0], sig = parts[1] || '';
  const expected = sign(payload, secret);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof data.exp === 'number' && Date.now() < data.exp;
  } catch (e) { return false; }
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  header.split(';').forEach(function (p) {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

const COOKIE = 'crest_admin';

module.exports = { makeToken, verifyToken, parseCookies, COOKIE };
