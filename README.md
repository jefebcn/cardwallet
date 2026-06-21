# Crest

Sito di lancio con lista d'attesa per **Crest** — il wallet digitale per i residenti della Repubblica di San Marino.

San Marino non è UE né SEE: Revolut, Wise e N26 non operano qui. Crest nasce per colmare quel vuoto con un conto moderno — IBAN, carta e trasferimenti istantanei.

## Stack

- HTML statico multi-pagina (nessun build step)
- Tailwind CSS via CDN + config condivisa (`assets/tw.js`)
- Vanilla JS (`assets/app.js`) — nav/footer iniettati, motion, cookie banner
- Font **General Sans** (Fontshare) — alternativa libera ad Aeonik (font di Revolut, commerciale)
- Form lista d'attesa **nativo** (nessun servizio terzo visibile) → `/api/subscribe` → Google Sheet
- Deploy su [Vercel](https://vercel.com)

## Struttura

```
index.html          Homepage (stile Revolut, palette Terra)
chi-siamo.html      Chi siamo
faq.html            Domande frequenti
contatti.html       Contatti
privacy.html        Privacy Policy
cookie.html         Cookie Policy
termini.html        Termini e condizioni
admin.html          Pannello lista d'attesa (vedi sotto)
assets/tw.js        Config Tailwind (palette + font)
assets/app.css      Stili condivisi + animazioni
assets/app.js       Nav, footer, motion, cookie, form lista d'attesa
robots.txt · vercel.json
```

## Design

- **Palette "Terra"** — parchment `#F4EDE0`, forest `#1E3A2F`, stone `#7D6348`, ink `#110F08`, sand `#A89880`, accento clay `#C2603A`.
- **Font** — General Sans (display + testo), pesi 400–700.
- **Motion** — hero cinematografico (fondo scuro con aurora animata, grana film, parallax col mouse, ingresso GSAP), reveal allo scroll, card fluttuanti, marquee, counter animati. Rispetta `prefers-reduced-motion` e disattiva il parallax-mouse su touch.
- **Identità** — "Crest" = vetta del Monte Titano + cimiero araldico della Repubblica.

## Lista d'attesa interna

Il form della homepage è **nativo e on-brand**: nessun iframe o logo di terze parti. Invia i dati a `POST /api/subscribe`, che valida lato server (nome, email, castello, honeypot anti-spam) e li **accoda a un Google Sheet** tramite un Google Apps Script. L'admin legge poi lo stesso foglio.

Flusso: `form sito → /api/subscribe → Apps Script (webhook) → Google Sheet → /api/subscribers → /admin`.

### Setup del foglio (una volta sola)

1. Crea un Google Sheet con intestazioni nella prima riga: `Data | Nome | Email | Castello`.
2. **Estensioni → Apps Script**, incolla questo codice e salva:

   ```js
   const SECRET = 'INCOLLA_QUI_LO_STESSO_SHEET_WEBHOOK_SECRET';
   function doPost(e) {
     const d = JSON.parse(e.postData.contents || '{}');
     if (d.secret !== SECRET) {
       return ContentService.createTextOutput('forbidden').setMimeType(ContentService.MimeType.TEXT);
     }
     const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     sh.appendRow([d.data || new Date().toISOString(), d.nome || '', d.email || '', d.castello || '']);
     return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Distribuisci → Nuova distribuzione → Tipo: App web** → *Esegui come: me*, *Accesso: chiunque* → copia l'URL `…/exec`.
4. Su Vercel imposta `SHEET_WEBHOOK_URL` (l'URL appena copiato) e `SHEET_WEBHOOK_SECRET` (lo stesso valore di `SECRET`).
5. Per l'admin, **File → Condividi → Pubblica sul web → CSV** e imposta `SHEET_CSV_URL`.

Niente database: il foglio è l'unica fonte dei dati, leggibile anche direttamente da Google Sheets.

## Pannello admin (`/admin`)

Dashboard per consultare gli iscritti, con statistiche, ricerca ed export CSV. Legge i dati dal **Google Sheet alimentato dal form**, lato server.

**Autenticazione server-side** tramite funzioni Vercel (`/api`):

- `POST /api/subscribe` — pubblico; valida l'iscrizione e la accoda al foglio via `SHEET_WEBHOOK_URL`.
- `POST /api/login` — verifica la password (`ADMIN_PASSWORD`) e imposta un cookie di sessione firmato HMAC, HttpOnly + Secure + SameSite=Strict (7 giorni).
- `GET /api/subscribers` — protetto dal cookie; legge il CSV da `SHEET_CSV_URL` lato server e restituisce JSON (l'URL del foglio non è più esposto al client).
- `POST /api/logout` — invalida la sessione.

### Variabili d'ambiente (Vercel → Settings → Environment Variables)

| Variabile | Descrizione |
|---|---|
| `ADMIN_PASSWORD` | Password unica per accedere a `/admin`. |
| `SESSION_SECRET` | Stringa casuale lunga per firmare i cookie (`openssl rand -base64 48`). |
| `SHEET_CSV_URL` | Link del Google Sheet pubblicato in CSV (File → Condividi → Pubblica sul web → CSV). |
| `SHEET_WEBHOOK_URL` | URL del Google Apps Script che accoda gli iscritti al foglio. |
| `SHEET_WEBHOOK_SECRET` | Segreto condiviso con lo script (`openssl rand -base64 24`). |

Vedi `.env.example`. Per provare in locale serve un runtime che esegua le funzioni `/api` (es. `vercel dev`).

> Nota: lo stack è su Vercel Functions perché il sito è già lì. Il codice è portabile su **Cloudflare Pages Functions** con piccole modifiche alle firme.

## Sviluppo locale

Serve un server statico (i percorsi sono assoluti, es. `/assets/...`):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Repo collegato a Vercel, sito statico. `vercel.json` abilita clean URLs (`/faq`, `/privacy`, …) e header di sicurezza. Ogni push su `main` aggiorna la produzione.

---

*Crest è un progetto in fase di pre-lancio. Non è una banca né un istituto autorizzato.*
