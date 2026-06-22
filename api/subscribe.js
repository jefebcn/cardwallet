'use strict';
/* Iscrizione alla lista d'attesa — endpoint interno (niente servizi terzi visibili).
   Riceve il form dal sito, valida lato server e inoltra la riga a un Google Apps
   Script (SHEET_WEBHOOK_URL) che la accoda al Google Sheet. L'admin continua a
   leggere lo stesso foglio via SHEET_CSV_URL. */

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var CASTELLI = [
  'Città di San Marino', 'Borgo Maggiore', 'Serravalle', 'Domagnano',
  'Fiorentino', 'Acquaviva', 'Faetano', 'Montegiardino', 'Chiesanuova'
];

function clean(v, max) {
  // rimuove caratteri di controllo (newline incluse) per evitare injection nel foglio
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max || 200);
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  var body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};

  // honeypot: i bot compilano questo campo invisibile -> fingiamo successo
  if (clean(body.website, 100)) { res.status(200).json({ ok: true }); return; }

  var nome = clean(body.nome, 80);
  var email = clean(body.email, 160).toLowerCase();
  var castello = clean(body.castello, 60);

  if (nome.length < 2) { res.status(400).json({ error: 'Inserisci il tuo nome.' }); return; }
  if (!EMAIL_RE.test(email)) { res.status(400).json({ error: 'Inserisci un indirizzo email valido.' }); return; }
  if (castello && CASTELLI.indexOf(castello) < 0) castello = ''; // ignora valori non previsti

  var webhook = process.env.SHEET_WEBHOOK_URL || '';
  if (!webhook) {
    res.status(503).json({ error: 'Iscrizioni temporaneamente non disponibili. Riprova più tardi.' });
    return;
  }

  var row = {
    data: new Date().toISOString(),
    nome: nome,
    email: email,
    castello: castello,
    secret: process.env.SHEET_WEBHOOK_SECRET || ''
  };

  try {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 8000);
    var r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      redirect: 'follow',
      signal: ctrl.signal
    });
    clearTimeout(timer);

    // Apps Script risponde sempre HTTP 200: bisogna leggere il corpo per sapere
    // se ha davvero scritto la riga ({ok:true}) o se ha rifiutato/è andato in errore.
    var txt = await r.text();
    var data = null;
    try { data = JSON.parse(txt); } catch (e) { /* non-JSON: probabile pagina di login/errore */ }

    if (r.ok && data && data.ok === true) {
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({ ok: true });
      return;
    }

    // Log the raw response for debugging (visible in Vercel function logs)
    console.error('[subscribe] Apps Script raw response (HTTP ' + r.status + '):', txt.slice(0, 400));

    // Diagnostica leggibile per capire cosa correggere lato Apps Script
    var hint;
    if (!r.ok) {
      hint = 'HTTP ' + r.status + ' — lo script ha rifiutato la richiesta.';
    } else if (data && data.error === 'forbidden') {
      hint = 'segreto non corrispondente: SHEET_WEBHOOK_SECRET in Vercel ≠ SECRET nello script.';
    } else if (data && data.error) {
      hint = 'errore nello script: ' + data.error;
    } else if (!data) {
      hint = 'risposta non JSON — possibile cause: URL /dev invece di /exec, deployment non pubblicato, o funzione respond() mancante nello script.';
    } else {
      hint = 'risposta inattesa dallo script: ' + JSON.stringify(data).slice(0, 120);
    }
    res.status(502).json({ error: 'Iscrizione non registrata — ' + hint });
  } catch (e) {
    res.status(502).json({ error: 'Non siamo riusciti a registrarti (timeout o rete). Riprova tra poco.' });
  }
};
