# Crest

Landing page con lista d'attesa per **Crest** — il wallet digitale per i residenti della Repubblica di San Marino.

San Marino non è UE né SEE: Revolut, Wise e N26 non operano qui. Crest nasce per colmare quel vuoto con un conto moderno — IBAN, carta e trasferimenti istantanei.

## Stack

- HTML5 single file (`index.html`)
- Tailwind CSS via CDN
- Vanilla JS (nessun framework, nessun build step)
- Form lista d'attesa via [Tally.so](https://tally.so)
- Deploy su [Vercel](https://vercel.com)

## Identità

- **Nome** — *Crest*: la vetta del Monte Titano + il *crest* araldico (cimiero) dello stemma della Repubblica.
- **Palette "Terra"** — parchment `#F4EDE0`, forest `#1E3A2F`, stone `#7D6348`, ink `#110F08`, sand `#A89880`.
- **Font** — Fraunces (display) + Schibsted Grotesk (testo).

## Integrare il form Tally

1. Crea il form su [tally.so](https://tally.so).
2. **Form → Share → Embed** e copia l'ID del form (es. `wAbCdE`).
3. In `index.html`, cerca `TALLY_FORM_ID` e sostituiscilo con l'ID reale.
4. Lo script rileva automaticamente la configurazione: mostra l'iframe Tally e nasconde il form fallback. (In alternativa, togli `hidden` dall'`<iframe>` e cancella il blocco `.js-fallback-form`.)

Finché Tally non è configurato resta visibile un form fallback on-brand (solo anteprima: non salva i dati).

## Sviluppo locale

Nessun build necessario. Apri `index.html` nel browser, oppure:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Collega il repo a Vercel: il sito è statico, nessuna configurazione richiesta (`vercel.json` imposta solo header di sicurezza e clean URLs).

---

*Crest non è ancora una banca né un istituto autorizzato. Questo repository contiene una landing page per raccogliere una lista d'attesa.*
