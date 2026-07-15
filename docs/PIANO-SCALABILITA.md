# Crest — Piano "scalabile & scaricabile"

> Il problema: momentum perso, nessun motore automatico che porti l'utente a **installare**
> e **invitare**. Avevamo i pezzi (demo app, backend, contenuti) ma scollegati.
> Questo piano li collega. Stato aggiornato ad ogni intervento.

---

## Le problematiche individuate

1. **Slancio perso** — promozione manuale, crescita ferma → serve un motore (semi)automatico.
2. **Manca il "download"** — c'erano demo app `/app` e scaffold nativo `crest-app/`, ma niente
   guidava all'installazione. L'app nativa non esce finché non c'è il partner BaaS.
3. **Differenziazione non messa in scena** — il "perché Crest e non altri" non era una leva.
4. **Zero automazione social** — pubblicazione tutta a mano.
5. **Poco contesto per convertire** — scarsa prova sociale live, niente gamification.
6. **Scalabilità non misurata** — nessun funnel tracciato.

---

## Le soluzioni (stato)

| # | Soluzione | Stato |
|---|-----------|:---:|
| 1 | **PWA installabile + funnel "Scarica l'app"** (prompt install, istruzioni iOS/Android, manifest arricchito) | ✅ Fatto |
| 2 | **Sezione differenziazione** "Perché Crest è diverso" (tabella vs Revolut/Wise/banca locale) | ✅ Fatto |
| 3 | **Tracciamento funnel** (eventi TryApp → InstallClick → Install → Signup → Share) | ✅ Fatto |
| 4 | **Automazione social** (content.json + generatore CSV importabile in scheduler) | ✅ Fatto |
| 5 | **Demo app → CTA** (banner /app trasformato in "Unisciti alla lista") | ✅ Fatto |
| 6 | **Referral "salta la fila"** (già attivo dal ciclo precedente) | ✅ Fatto |
| 7 | Piano master (questo documento) | ✅ Fatto |

---

## Il "download" ora esiste — via PWA

Finché l'app nativa dipende dal partner BaaS, **crestpay.app è installabile come app**:
- Bottone **"Scarica l'app"** nell'hero.
- Su Android/desktop: **prompt nativo** di installazione (`beforeinstallprompt`).
- Su iPhone: **modale con istruzioni** (Safari → Condividi → Aggiungi a Home).
- Manifest con `shortcuts`, `id`, `scope`, icone maskable → si apre a schermo intero, offline.
- Evento **Install** tracciato.

Quando ci sarà il partner (Unlimit/Codego/…), lo scaffold `crest-app/` (Expo) diventa l'app
nativa su App Store/Play, e la PWA resta come porta d'ingresso leggera.

---

## Il motore di crescita (loop virale)

```
Contenuti social (auto) → visita sito → prova /app → installa PWA → si iscrive
     ↑                                                                    │
     └──────────────  invita amici (+10 posizioni, referral)  ←──────────┘
```

Ogni iscritto genera altri iscritti (referral), ogni contenuto porta traffico (automazione
CSV), ogni visita ha un percorso chiaro verso installazione + iscrizione (funnel tracciato).

---

## La "cosa in più" rispetto agli altri (differenziatori)

1. **Serve San Marino** — l'unico; Revolut/Wise/N26 no.
2. **Referral salta-fila** — gamification che gli altri wallet non offrono in lista d'attesa.
3. **Carta in metallo** inclusa per i primi.
4. **Local-first** — costruito *per* la Repubblica, non adattato.
5. **Installabile subito** (PWA) — provi e "scarichi" oggi, prima del lancio.

---

## Scalabilità tecnica

- **Backend:** Supabase (Postgres gestito) — scala a decine di migliaia di righe senza
  interventi; RLS INSERT-only per la waitlist, service key lato server per l'admin.
- **Hosting:** Vercel (static + serverless) — auto-scala, CDN globale, zero manutenzione.
- **Email:** Resend — transazionali, scala con i piani.
- **Rate limiting:** best-effort in-memory su `/api/subscribe` (per limite robusto: Upstash/Vercel KV).
- **Contenuti:** pipeline `npm run ig:all` → immagini + CSV, riproducibile.

### Cosa monitorare (funnel)
Eventi su Plausible/Vercel: `TryApp`, `InstallClick`, `Install`, `Signup`, `Share`.
Rapporti chiave: visite→install %, install→signup %, signup→referral %.

---

## Prossimi potenziamenti (quando vuoi)
- **Gamification referral**: leaderboard e milestone/perk ("porta 3 amici → carta prioritaria").
- **GitHub Action** che rigenera i PNG a ogni modifica dei template.
- **API scheduler** (Publer/Metricool) per pushare il calendario senza import manuale.
- **Push notification** PWA per riattivare gli iscritti al lancio.
- **A/B test** su hero e CTA install per massimizzare la conversione.

---

## Riferimenti nel repo
- PWA/install: `index.html` (hero + modale), `assets/app.js` (`initInstall`), `manifest.json`
- Differenziazione: `index.html` sezione `#perche-diverso`
- Funnel: `assets/app.js` (`initInstall`, `initFunnel`), eventi Plausible
- Automazione social: `marketing/instagram/AUTOMAZIONE.md`, `content.json`, `make-schedule.js`
- Referral: `api/subscribe.js`, `api/referral-status.js`, `docs/supabase-referral-migration.sql`
- Business/partner: `docs/BUSINESS-PLAN.md`, `docs/BAAS-DECISIONE.md`, `docs/PIANO-FINANZIARIO.md`
