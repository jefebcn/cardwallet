'use strict';
/* Iscrizione alla lista d'attesa — salva direttamente su Supabase (tabella waitlist). */

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var CASTELLI = [
  'Città di San Marino', 'Borgo Maggiore', 'Serravalle', 'Domagnano',
  'Fiorentino', 'Acquaviva', 'Faetano', 'Montegiardino', 'Chiesanuova'
];

var SUPA_URL = 'https://pfgjsgnafgcbjrpoivgz.supabase.co';
var SUPA_KEY = process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pzZ25hZmdjYmpycG9pdmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA4OTQsImV4cCI6MjA5NzY3Njg5NH0.q-4SqgrGo7LW0j9sPUzH_QTsgVNHRBxfUGvqJVGsp30';

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[ -]/g, ' ').trim().slice(0, max || 200);
}

/* Seed per la posizione mostrata (coerente con /api/waitlist-count). */
var SEED = 318;

/* Codice referral univoco-abbastanza: 9 caratteri base36, collisione trascurabile. */
function makeRefCode() {
  var a = Math.random().toString(36).slice(2, 7);
  var b = Math.random().toString(36).slice(2, 6);
  return (a + b).slice(0, 9);
}

/* Conteggio totale iscritti (per stimare la posizione in lista). */
async function totalCount() {
  try {
    var r = await fetch(SUPA_URL + '/rest/v1/waitlist?select=*', {
      method: 'HEAD',
      headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY, 'Prefer': 'count=exact' },
    });
    var range = r.headers.get('content-range') || '';
    var n = parseInt((range.split('/')[1] || '').trim(), 10);
    return isNaN(n) ? null : n;
  } catch (e) { return null; }
}

/* Inserimento con fallback: se le colonne referral non esistono ancora, riprova
   coi soli campi base così il sito continua a funzionare prima della migrazione. */
async function insertRow(full) {
  var headers = {
    'Content-Type': 'application/json',
    'apikey': SUPA_KEY,
    'Authorization': 'Bearer ' + SUPA_KEY,
    'Prefer': 'return=minimal',
  };
  var r = await fetch(SUPA_URL + '/rest/v1/waitlist', {
    method: 'POST', headers: headers, body: JSON.stringify(full),
  });
  if (r.status === 400 || r.status === 404) {
    var basic = { nome: full.nome, email: full.email, castello: full.castello };
    var r2 = await fetch(SUPA_URL + '/rest/v1/waitlist', {
      method: 'POST', headers: headers, body: JSON.stringify(basic),
    });
    return { res: r2, referralSaved: false };
  }
  return { res: r, referralSaved: true };
}

/* ---- Rate limiting best-effort (in-memory, per istanza calda) ----
   Difesa contro burst sullo stesso IP. Le funzioni serverless sono effimere,
   quindi e' efficace finche' l'istanza resta calda; per un limite robusto e
   distribuito usare Upstash/Vercel KV. */
var RL_WINDOW_MS = 60000;
var RL_MAX = 5;
var rlHits = new Map();
function rateLimited(ip) {
  if (!ip) return false;
  var now = Date.now();
  var arr = (rlHits.get(ip) || []).filter(function (t) { return now - t < RL_WINDOW_MS; });
  arr.push(now);
  rlHits.set(ip, arr);
  if (rlHits.size > 5000) { for (var k of rlHits.keys()) { rlHits.delete(k); if (rlHits.size <= 2500) break; } }
  return arr.length > RL_MAX;
}

/* ---- Email di benvenuto (via Resend) ----
   Attiva solo se RESEND_API_KEY e' configurata; un errore non blocca l'iscrizione. */
async function sendWelcomeEmail(nome, email, refLink) {
  var key = process.env.RESEND_API_KEY;
  if (!key) return;
  var from = process.env.WAITLIST_FROM_EMAIL || 'Crest <noreply@crestpay.app>';
  var first = (nome || '').split(' ')[0] || 'ciao';
  var html = [
    '<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0e1c15;padding:48px 16px">',
      '<div style="max-width:540px;margin:0 auto">',

        /* logo */
        '<div style="text-align:center;padding-bottom:28px">',
          '<img src="https://crestpay.app/assets/apple-touch-icon.png" width="64" height="64" alt="Crest"',
               ' style="border-radius:16px;display:inline-block;border:0" />',
        '</div>',

        /* card */
        '<div style="background:#1E3A2F;border-radius:20px;overflow:hidden;color:#F4EDE0">',

          '<div style="background:#16291F;padding:24px 36px">',
            '<span style="font-size:20px;font-weight:700;letter-spacing:-.02em">Crest</span>',
            '<span style="color:rgba(244,237,224,.4);font-style:italic;font-size:14px;margin-left:10px">Libertas</span>',
          '</div>',

          '<div style="padding:36px 36px 28px">',
            '<h1 style="font-size:27px;font-weight:700;margin:0 0 16px;line-height:1.15;letter-spacing:-.02em">',
              'Sei in lista, ' + first + '. 🏔️',
            '</h1>',
            '<p style="color:rgba(244,237,224,.8);line-height:1.65;font-size:15px;margin:0 0 24px">',
              'Grazie per esserti iscritto alla lista d\'attesa di Crest &mdash; il primo wallet digitale costruito per la Repubblica di San Marino.',
            '</p>',

            '<p style="color:rgba(244,237,224,.45);font-size:11px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;margin:0 0 12px">Cosa succede adesso</p>',

            '<table style="border-collapse:collapse;width:100%;margin-bottom:32px">',
              '<tr>',
                '<td style="vertical-align:top;padding:10px 0;width:34px">',
                  '<span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#C2603A;text-align:center;line-height:26px;font-size:11px;font-weight:700;color:#F4EDE0">1</span>',
                '</td>',
                '<td style="padding:10px 0 10px 12px;color:rgba(244,237,224,.78);font-size:14px;line-height:1.55">',
                  '<strong style="color:#F4EDE0">Accesso prioritario al lancio.</strong> Gli iscritti entrano prima di tutti &mdash; nessuna coda, nessuna attesa extra.',
                '</td>',
              '</tr>',
              '<tr>',
                '<td style="vertical-align:top;padding:10px 0;width:34px">',
                  '<span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#C2603A;text-align:center;line-height:26px;font-size:11px;font-weight:700;color:#F4EDE0">2</span>',
                '</td>',
                '<td style="padding:10px 0 10px 12px;color:rgba(244,237,224,.78);font-size:14px;line-height:1.55">',
                  '<strong style="color:#F4EDE0">Primo a ricevere la carta fisica.</strong> Le card in metallo vengono assegnate in ordine di lista. Prima ti iscrivi, prima la ricevi.',
                '</td>',
              '</tr>',
              '<tr>',
                '<td style="vertical-align:top;padding:10px 0;width:34px">',
                  '<span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#C2603A;text-align:center;line-height:26px;font-size:11px;font-weight:700;color:#F4EDE0">3</span>',
                '</td>',
                '<td style="padding:10px 0 10px 12px;color:rgba(244,237,224,.78);font-size:14px;line-height:1.55">',
                  '<strong style="color:#F4EDE0">Niente spam.</strong> Ti scriviamo solo quando c\'è qualcosa di concreto da dirti.',
                '</td>',
              '</tr>',
            '</table>',

            (refLink ? [
              '<div style="background:#16291F;border-radius:14px;padding:20px 22px;margin-bottom:28px">',
                '<p style="color:#F4EDE0;font-size:15px;font-weight:700;margin:0 0 6px">Vuoi salire in lista? 🚀</p>',
                '<p style="color:rgba(244,237,224,.72);font-size:13px;line-height:1.55;margin:0 0 14px">',
                  'Ogni amico che si iscrive con il tuo link ti fa <strong style="color:#F4EDE0">salire di 10 posizioni</strong>. Condividi il tuo invito personale:',
                '</p>',
                '<a href="' + refLink + '" style="display:inline-block;background:#C2603A;color:#F4EDE0;text-decoration:none;font-size:13px;font-weight:600;padding:11px 20px;border-radius:999px;word-break:break-all">',
                  refLink,
                '</a>',
              '</div>'
            ].join('') : ''),

            '<div style="text-align:center;margin-bottom:8px">',
              '<a href="https://crestpay.app" style="display:inline-block;background:#C2603A;color:#F4EDE0;text-decoration:none;font-size:15px;font-weight:600;padding:15px 40px;border-radius:999px;letter-spacing:-.01em">',
                'Visita crestpay.app',
              '</a>',
            '</div>',
          '</div>',

          '<div style="background:#16291F;padding:18px 36px">',
            '<p style="color:rgba(244,237,224,.3);font-size:12px;line-height:1.6;margin:0">',
              'Crest è in fase di pre-lancio e non è una banca né un istituto di pagamento autorizzato. ',
              'L\'iscrizione alla lista d\'attesa non costituisce apertura di un conto né impegno contrattuale.',
            '</p>',
          '</div>',
        '</div>',

        '<p style="text-align:center;color:rgba(244,237,224,.2);font-size:12px;margin:22px 0 0">',
          'Crest &middot; Repubblica di San Marino &middot; ',
          '<a href="https://crestpay.app/privacy" style="color:rgba(244,237,224,.3);text-decoration:underline">Privacy</a>',
        '</p>',
      '</div>',
    '</div>'
  ].join('');
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ from: from, to: [email], subject: 'Sei in lista, ' + first + ' — benvenuto su Crest 🏔️', html: html }),
    });
  } catch (e) { console.error('[subscribe] welcome email error', e.message); }
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  var ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
           (req.socket && req.socket.remoteAddress) || '';
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Troppe richieste. Riprova tra un minuto.' });
    return;
  }

  var body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};

  // honeypot anti-spam
  if (clean(body.website, 100)) { res.status(200).json({ ok: true }); return; }

  var nome    = clean(body.nome, 80);
  var email   = String(body.email == null ? '' : body.email).trim().toLowerCase().slice(0, 160);
  var castello = clean(body.castello, 60);
  var referredBy = String(body.ref == null ? '' : body.ref).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 20);

  if (nome.length < 2) { res.status(400).json({ error: 'Inserisci il tuo nome.' }); return; }
  if (!EMAIL_RE.test(email)) { res.status(400).json({ error: 'Inserisci un indirizzo email valido.' }); return; }
  if (castello && CASTELLI.indexOf(castello) < 0) castello = '';

  var refCode = makeRefCode();

  try {
    var out = await insertRow({
      nome: nome, email: email, castello: castello,
      ref_code: refCode, referred_by: referredBy || null,
    });
    var r = out.res;

    if (r.status === 201 || r.status === 200) {
      var n = await totalCount();
      var position = n == null ? null : n + SEED;
      var refLink = out.referralSaved ? ('https://crestpay.app/?ref=' + refCode) : null;
      try { await sendWelcomeEmail(nome, email, refLink); } catch (e) {}
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({
        ok: true,
        ref_code: out.referralSaved ? refCode : null,
        position: position,
      });
      return;
    }

    var txt = await r.text();
    var data = null;
    try { data = JSON.parse(txt); } catch (e) {}

    // duplicate email (unique constraint)
    if (r.status === 409 || (data && data.code === '23505')) {
      res.status(200).json({ ok: true }); // trattato come successo silenzioso
      return;
    }

    console.error('[subscribe] Supabase error', r.status, txt.slice(0, 300));
    res.status(502).json({ error: 'Iscrizione non registrata — errore del server (' + r.status + '). Riprova tra poco.' });
  } catch (e) {
    console.error('[subscribe] fetch error', e.message);
    res.status(502).json({ error: 'Non siamo riusciti a registrarti (rete). Riprova tra poco.' });
  }
};
