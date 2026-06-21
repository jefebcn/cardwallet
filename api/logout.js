'use strict';
const { COOKIE } = require('../lib/auth');

module.exports = async function (req, res) {
  res.setHeader('Set-Cookie',
    COOKIE + '=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
  res.status(200).json({ ok: true });
};
