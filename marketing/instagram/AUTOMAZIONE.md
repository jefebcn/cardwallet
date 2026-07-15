# Crest — Automazione pubblicazione social

> Obiettivo: rendere la pubblicazione il più automatica possibile. Da contenuti nel repo →
> a un file che si importa **una volta sola** in uno scheduler, che poi pubblica da solo.

---

## Il flusso automatico (3 comandi)

```bash
# 1. Rigenera tutte le immagini dai template (posts.html → png/)
npm run ig:render

# 2. Genera il calendario importabile (CSV) a partire da una data
npm run ig:schedule -- 2026-08-01 19:00 2
#    args: [data inizio] [ora post] [1 post ogni N giorni]

# oppure entrambi in un colpo:
npm run ig:all
```

Output: **`marketing/instagram/schedule.csv`** — pronto da importare.

---

## Come diventa "automatico" davvero

Il CSV generato ha colonne `Date, Time, Media, Type, Caption`. Si **importa in blocco** in
uno scheduler che poi pubblica in automatico agli orari indicati:

| Scheduler | Import CSV in blocco | Piano free | Note |
|-----------|:---:|:---:|------|
| **Publer** | ✅ (Bulk CSV) | limitato | Il più comodo per import CSV |
| **Metricool** | ✅ (import + Planning) | generoso | Ottimo anche per statistiche |
| **Later / Buffer** | 🟡 (CSV su piani a pagamento) | base | Semplici |
| **Meta Business Suite** | ❌ (no CSV, ma scheduling manuale gratis) | gratis | Ufficiale IG/FB |

**Passi (una volta sola):**
1. `npm run ig:all` → ottieni `schedule.csv` + immagini aggiornate in `png/`
2. Carica le immagini di `png/` nella libreria dello scheduler
3. Importa `schedule.csv` (Bulk import) → i post entrano in coda con data, ora e caption
4. Da lì lo scheduler pubblica **da solo**. Tu controlli solo le storie interattive (sondaggi).

> Le **storie** con sticker (sondaggio, link, countdown) vanno pubblicate a mano perché gli
> sticker interattivi non sono importabili — ma il CSV te le ricorda nei giorni giusti.

---

## Dove si modificano i contenuti

- **Testi/caption e ordine:** `content.json` (una voce per post/storia).
- **Grafica dei post:** `posts.html` (poi `npm run ig:render`).
- **Caption estese / hashtag per post:** `captions.md` (riferimento umano).

Aggiungere un post = aggiungere una slide in `posts.html` + una voce in `content.json`,
poi `npm run ig:all`. Il calendario si rigenera da solo.

---

## Idea di automazione avanzata (facoltativa, futura)
- **GitHub Action** che a ogni push su `posts.html` esegue `npm run ig:render` e committa i PNG
  aggiornati (richiede Playwright in CI).
- **Webhook scheduler**: alcuni scheduler (Publer/Metricool) hanno API per creare post via
  chiamata HTTP → si potrebbe pushare il calendario senza import manuale.

Per ora il flusso CSV copre il 90% del valore con zero costi.
