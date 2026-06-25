'use strict';
const crypto = require('crypto');
const { makeToken, COOKIE } = require('../lib/auth');

/* Basic in-memory rate limiting: max 10 attempts per IP per 15 min */
const RL_WINDOW_MS = 15 * 60 * 1000;
const RL_MAX = 10;
const rlHits = new Map();
function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const arr = (rlHits.get(ip) || []).filter(t => now - t < RL_WINDOW_MS);
  arr.push(now);
  rlHits.set(ip, arr);
  if (rlHits.size > 1000) { for (const k of rlHits.keys()) { rlHits.delete(k); if (rlHits.size <= 500) break; } }
  return arr.length > RL_MAX;
}

module.exports = async function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
             (req.socket && req.socket.remoteAddress) || '';
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Troppi tentativi. Riprova tra 15 minuti.' });
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
