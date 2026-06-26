# Crest

Sito di lancio con lista d'attesa per **Crest** — il wallet digitale per i residenti della Repubblica di San Marino.

San Marino non è UE né SEE: Revolut, Wise e N26 non operano qui. Crest nasce per colmare quel vuoto con un conto moderno — IBAN, carta e trasferimenti istantanei.

## Stack

- HTML statico multi-pagina (nessun build step)
- Tailwind CSS **precompilato** in un file statico (`assets/tailwind.css`) — niente CDN runtime, stili immediati e affidabili
- Vanilla JS (`assets/app.js`) — nav/footer iniettati, motion, cookie banner
- Font **General Sans** (Fontshare) — alternativa libera ad Aeonik (font di Revolut, commerciale)
- Form lista d'attesa **nativo** (nessun servizio terzo visibile) → `/api/subscribe` → Supabase
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
tailwind.config.js  Config Tailwind (palette + font + keyframes)
assets/tailwind.css Tailwind compilato (generato, vedi sotto)
assets/app.css      Stili condivisi + animazioni
assets/app.js       Nav, footer, motion, cookie, form lista d'attesa
robots.txt · vercel.json
```

## Design

- **Palette "Terra"** — parchment `#F4EDE0`, forest `#1E3A2F`, stone `#7D6348`, ink `#110F08`, sand `#A89880`, accento clay `#C2603A`.
- **Font** — General Sans (display + testo), pesi 400–700.
- **Motion** — hero cinematografico (fondo scuro con aurora animata, grana film, parallax col mouse, ingresso GSAP), reveal allo scroll, card fluttuanti, marquee, counter animati. Rispetta `prefers-reduced-motion` e disattiva il parallax-mouse su touch.
- **Identità** — "Crest" = vetta del Monte Titano. Il logo è una **C** sormontata dal profilo del Monte Titano con le sue cime innevate.

### Logo

File vettoriali in `assets/`:

- `logo.svg` — mark in `currentColor` (eredita il colore del testo).
- `logo-forest.svg` / `logo-parchment.svg` — versioni a colore fisso per sfondi chiari/scuri.
- `favicon.svg` — tile forest con il mark parchment (favicon del sito).

Il mark è vettoriale: scala nitido a qualsiasi dimensione. La navbar usa `logo` inline che vira da forest a parchment sopra l'hero scuro.

## Lista d'attesa

Il form della homepage è **nativo e on-brand**: nessun iframe o logo di terze parti. Invia i dati a `POST /api/subscribe`, che valida lato server (nome, email, castello, honeypot anti-spam) e li **salva su Supabase** (tabella `waitlist`).

Flusso: `form sito → /api/subscribe → Supabase (waitlist) → /api/subscribers → /admin`.

### Setup Supabase (una volta sola)

1. Crea un progetto su [supabase.com](https://supabase.com).
2. Crea la tabella `waitlist` con colonne: `id` (uuid, PK), `created_at` (timestamptz, default `now()`), `nome` (text), `email` (text, unique), `castello` (text).
3. Abilita **Row Level Security** e aggiungi una policy che consente solo `INSERT` al ruolo `anon` (nessun SELECT/UPDATE/DELETE).
4. Copia la **anon key** e impostala su Vercel come `SUPABASE_ANON_KEY`.

### Email di benvenuto (Resend, opzionale)

Al completamento dell'iscrizione viene inviata automaticamente un'email di benvenuto personalizzata tramite [Resend](https://resend.com). Per attivarla:

1. Crea un account su [resend.com](https://resend.com) e verifica il dominio `crestpay.app`.
2. Crea una API key e impostala su Vercel come `RESEND_API_KEY`.
3. _(Opzionale)_ Imposta `WAITLIST_FROM_EMAIL` per personalizzare il mittente (default: `Crest <noreply@crestpay.app>`).

Se `RESEND_API_KEY` non è impostata, l'iscrizione funziona comunque senza inviare email.

## Pannello admin (`/admin`)

Dashboard per consultare gli iscritti, con statistiche, ricerca ed export CSV. Legge i dati da Supabase lato server.

**Autenticazione server-side** tramite funzioni Vercel (`/api`):

- `POST /api/subscribe` — pubblico; valida l'iscrizione e la salva su Supabase.
- `POST /api/login` — verifica la password (`ADMIN_PASSWORD`) e imposta un cookie di sessione firmato HMAC, HttpOnly + Secure + SameSite=Strict (7 giorni).
- `GET /api/subscribers` — protetto dal cookie; legge i dati da Supabase lato server e restituisce JSON.
- `GET /api/waitlist-count` — pubblico; restituisce il conteggio iscritti (con seed offset) per il counter live sulla homepage.
- `POST /api/logout` — invalida la sessione.

### Variabili d'ambiente (Vercel → Settings → Environment Variables)

| Variabile | Descrizione |
|---|---|
| `ADMIN_PASSWORD` | Password unica per accedere a `/admin`. |
| `SESSION_SECRET` | Stringa casuale lunga per firmare i cookie (`openssl rand -base64 48`). |
| `SUPABASE_ANON_KEY` | Chiave anon di Supabase (scrittura INSERT sulla tabella `waitlist`). |
| `SUPABASE_SERVICE_KEY` | _(consigliato)_ Service-role key di Supabase — usata da `/api/subscribers` per leggere la lista in admin, bypassando RLS. Se assente si usa la anon key (richiede policy SELECT anche per anon). |
| `RESEND_API_KEY` | _(opzionale)_ Abilita l'email di benvenuto via [Resend](https://resend.com). Se assente l'iscrizione funziona comunque. |
| `WAITLIST_FROM_EMAIL` | _(opzionale)_ Mittente dell'email (default `Crest <noreply@crestpay.app>`; dominio da verificare su Resend). |

Vedi `.env.example`. Per provare in locale serve un runtime che esegua le funzioni `/api` (es. `vercel dev`).

> **Sicurezza Supabase (importante):** la `SUPABASE_ANON_KEY` è pubblica per
> design. La sicurezza della tabella `waitlist` dipende interamente dalla
> **Row Level Security**: abilitare RLS e consentire ai ruoli anon **solo
> `INSERT`** (nessun `SELECT`/`UPDATE`/`DELETE`), così la lista non è leggibile
> da chi possiede la chiave anon. La lettura per `/admin` usa la service key
> lato server (mai esposta al client).

> **Analytics:** le pagine pubbliche includono [Plausible](https://plausible.io)
> (cookieless, GDPR-friendly). Va creato il sito `crestpay.app` nella dashboard
> Plausible perché i dati vengano raccolti; lo script non usa cookie e non
> richiede consenso.

> **Anti-abuso:** `/api/subscribe` ha un honeypot + un rate limit best-effort
> in-memory (5 richieste/min per IP sull'istanza calda). Per un limite robusto
> e distribuito aggiungere Upstash/Vercel KV.

> Nota: lo stack è su Vercel Functions perché il sito è già lì. Il codice è portabile su **Cloudflare Pages Functions** con piccole modifiche alle firme.

## CSS (Tailwind statico)

Il sito **non** usa più la CDN `cdn.tailwindcss.com` (sconsigliata in produzione e a volte lenta a colorare la pagina). Le classi sono compilate una volta in `assets/tailwind.css` con la CLI standalone di Tailwind (nessun Node necessario).

Per rigenerare il CSS dopo aver aggiunto/cambiato classi nell'HTML o in `assets/app.js`:

```bash
# scarica la CLI standalone una volta (linux x64; vedi releases per altri OS)
curl -sSL -o tailwindcss https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-linux-x64
chmod +x tailwindcss
# compila (minificato)
printf '@tailwind base;@tailwind components;@tailwind utilities;' > tw-input.css
./tailwindcss -c tailwind.config.js -i tw-input.css -o assets/tailwind.css --minify
```

`tailwind.config.js` scansiona `./*.html` e `./assets/*.js`, quindi cattura anche le classi nella nav/footer iniettate da `app.js`. `assets/app.css` resta separato (stili custom + animazioni) e si carica dopo.

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
