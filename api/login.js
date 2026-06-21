'use strict';
const crypto = require('crypto');
const { makeToken, COOKIE } = require('../lib/auth');

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};

  const password = String(body.password || '');
  const expected = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.SESSION_SECRET || '';

  if (!expected || !secret) {
    res.status(500).json({ error: 'Server non configurato: imposta ADMIN_PASSWORD e SESSION_SECRET.' });
    return;
  }

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) {
    res.status(401).json({ error: 'Password errata' });
    return;
  }

  const token = makeToken(secret, 7);
  res.setHeader('Set-Cookie',
    COOKIE + '=' + token + '; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=' + (7 * 86400));
  res.status(200).json({ ok: true });
};
