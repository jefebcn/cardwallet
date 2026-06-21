# Crest

Sito di lancio con lista d'attesa per **Crest** — il wallet digitale per i residenti della Repubblica di San Marino.

San Marino non è UE né SEE: Revolut, Wise e N26 non operano qui. Crest nasce per colmare quel vuoto con un conto moderno — IBAN, carta e trasferimenti istantanei.

## Stack

- HTML statico multi-pagina (nessun build step)
- Tailwind CSS via CDN + config condivisa (`assets/tw.js`)
- Vanilla JS (`assets/app.js`) — nav/footer iniettati, motion, cookie banner
- Font **General Sans** (Fontshare) — alternativa libera ad Aeonik (font di Revolut, commerciale)
- Form lista d'attesa via [Tally.so](https://tally.so) (`Xx9M7Y`)
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
assets/app.js       Nav, footer, motion, cookie, Tally
robots.txt · vercel.json
```

## Design

- **Palette "Terra"** — parchment `#F4EDE0`, forest `#1E3A2F`, stone `#7D6348`, ink `#110F08`, sand `#A89880`, accento clay `#C2603A`.
- **Font** — General Sans (display + testo), pesi 400–700.
- **Motion** — reveal allo scroll, parallax, card fluttuanti, marquee, counter animati (puro CSS + IntersectionObserver, rispetta `prefers-reduced-motion`).
- **Identità** — "Crest" = vetta del Monte Titano + cimiero araldico della Repubblica.

## Form Tally

Il form `Xx9M7Y` è già integrato nella homepage (sezione lista d'attesa). Per cambiarlo, sostituisci l'ID nell'URL `data-tally-src` in `index.html`. Esiste un form fallback on-brand che appare solo se l'ID non è configurato.

## Pannello admin (`/admin`)

Dashboard per consultare gli iscritti, con statistiche, ricerca ed export CSV. Legge i dati dal **Google Sheet collegato a Tally**.

Configurazione (in cima allo `<script>` di `admin.html`):

1. `ACCESS_CODE` — codice di accesso (default `crest2026`, cambialo).
2. `SHEET_CSV_URL` — in Google Sheets: **File → Condividi → Pubblica sul web → CSV**, copia il link e incollalo.

> ⚠️ L'accesso è protetto **solo lato client**: è un filtro, non una vera autenticazione. Per un'area realmente sicura serve un backend con autenticazione server-side (es. funzione serverless Vercel + sessione). Vedi note sotto.

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
