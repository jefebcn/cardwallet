'use strict';
const { verifyToken, parseCookies, COOKIE } = require('../lib/auth');

var SUPA_URL = 'https://pfgjsgnafgcbjrpoivgz.supabase.co';
/* Reads use the service-role key (bypasses RLS) so that anon INSERT-only RLS
   can stay active. Falls back to the anon key if SUPABASE_SERVICE_KEY is not set
   (the admin read will work only if the anon SELECT policy is also enabled). */
var SUPA_READ_KEY = process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pzZ25hZmdjYmpycG9pdmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA4OTQsImV4cCI6MjA5NzY3Njg5NH0.q-4SqgrGo7LW0j9sPUzH_QTsgVNHRBxfUGvqJVGsp30';

module.exports = async function (req, res) {
  const secret = process.env.SESSION_SECRET || '';
  const cookies = parseCookies(req);

  if (!secret || !verifyToken(cookies[COOKIE], secret)) {
    res.status(401).json({ error: 'Non autorizzato' });
    return;
  }

  try {
    const r = await fetch(
      SUPA_URL + '/rest/v1/waitlist?select=created_at,nome,email,castello&order=created_at.desc',
      {
        headers: {
          'apikey': SUPA_READ_KEY,
          'Authorization': 'Bearer ' + SUPA_READ_KEY,
        },
      }
    );

    if (!r.ok) throw new Error(String(r.status));
    const rows = await r.json();

    // Format as { headers, rows } matching the previous Google Sheets shape
    const headers = ['Data', 'Nome', 'Email', 'Castello'];
    const formatted = rows.map(function (row) {
      return [
        row.created_at ? new Date(row.created_at).toLocaleString('it-IT') : '',
        row.nome || '',
        row.email || '',
        row.castello || '',
      ];
    });

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ headers: headers, rows: formatted, configured: true });
  } catch (e) {
    console.error('[subscribers] Supabase error', e.message);
    res.status(502).json({ error: 'Impossibile leggere gli iscritti da Supabase.' });
  }
};
