'use strict';
/* Stato referral: data una ref_code restituisce posizione in lista + n. inviti andati a buon fine.
   La posizione "salta la fila": ogni referral fa salire di BOOST posizioni.
   Lettura lato server: usa la service key se disponibile (bypassa RLS), altrimenti anon. */

var SUPA_URL = 'https://pfgjsgnafgcbjrpoivgz.supabase.co';
var SUPA_KEY = process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pzZ25hZmdjYmpycG9pdmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA4OTQsImV4cCI6MjA5NzY3Njg5NH0.q-4SqgrGo7LW0j9sPUzH_QTsgVNHRBxfUGvqJVGsp30';

var SEED = 318;
var BOOST = 10; // posizioni guadagnate per ogni amico iscritto

async function countWhere(query) {
  var r = await fetch(SUPA_URL + '/rest/v1/waitlist?' + query, {
    method: 'HEAD',
    headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY, 'Prefer': 'count=exact' },
  });
  var range = r.headers.get('content-range') || '';
  var n = parseInt((range.split('/')[1] || '').trim(), 10);
  return isNaN(n) ? null : n;
}

module.exports = async function (req, res) {
  var code = '';
  try { code = String((req.query && req.query.code) || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 20); }
  catch (e) { code = ''; }
  if (!code) { res.status(400).json({ error: 'Codice mancante.' }); return; }

  try {
    // 1) trova l'iscritto e la sua data di iscrizione
    var rowRes = await fetch(
      SUPA_URL + '/rest/v1/waitlist?ref_code=eq.' + encodeURIComponent(code) + '&select=created_at&limit=1',
      { headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY } }
    );
    if (!rowRes.ok) { res.status(502).json({ error: 'Lettura non disponibile.' }); return; }
    var rows = await rowRes.json();
    if (!rows || !rows.length) { res.status(404).json({ error: 'Codice non trovato.' }); return; }

    var createdAt = rows[0].created_at;

    // 2) rank grezzo = quanti si sono iscritti prima + 1 + seed
    var ahead = await countWhere('created_at=lt.' + encodeURIComponent(createdAt) + '&select=*');
    var rawRank = (ahead == null ? 0 : ahead) + 1 + SEED;

    // 3) inviti andati a buon fine
    var referrals = await countWhere('referred_by=eq.' + encodeURIComponent(code) + '&select=*');
    referrals = referrals == null ? 0 : referrals;

    // 4) posizione effettiva: salta la fila
    var position = Math.max(1, rawRank - referrals * BOOST);

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ position: position, referrals: referrals, boost: BOOST });
  } catch (e) {
    console.error('[referral-status] error', e.message);
    res.status(502).json({ error: 'Errore nel calcolo della posizione.' });
  }
};
