# Crest — Benchmark costi BaaS (per farsi un'idea)

> I BaaS non pubblicano i prezzi: sono sempre "su richiesta" e su misura dei volumi.
> Queste sono **stime di mercato** (Europa, 2025–26) per un fintech piccolo/white-label
> con carte + IBAN. Servono solo a darti un ordine di grandezza in attesa delle risposte.

---

## Le voci di costo di un BaaS (come ti fatturano)

| Voce | Cosa | Startup-friendly (Codego/Gemba-style) | Enterprise/grandi player |
|------|------|----------------------------------------|--------------------------|
| **Setup una tantum** | Integrazione, attivazione programma | **€0 – €15.000** | €50.000 – €250.000+ |
| **Canone mensile / MMC** | Minimo mensile garantito | **€500 – €2.500** | €2.500 – €10.000+ |
| **Conto/IBAN** | Per conto attivo | €0 – €1 / conto / mese | negoziato |
| **Emissione carta** | Per carta emessa | €2 – €10 / carta | + canone €0,50–2 / mese |
| **Transazione SEPA** | Per bonifico | €0,10 – €0,30 | negoziato |
| **FX (cambio valuta)** | Markup | 0,3% – 1% | negoziato |
| **KYC** | Per verifica identità | €0,50 – €3 / pratica | spesso incluso |
| **Tempo di go-live** | — | 2–8 settimane | 6–18 mesi |

---

## Dove si colloca Unlimit (ipotesi)

Unlimit è un **player grande e globale** (200+ località, divisione acquiring importante).
Probabile che tenda alla colonna **enterprise**: pricing su misura, possibili **minimi mensili
più alti** e attenzione ai volumi previsti. È negoziabile, ma potrebbero non essere "economici"
per un pre-lancio con poche centinaia di utenti.

> Questo conferma la strategia: se Unlimit ti quota minimi troppo alti per partire, **Codego**
> (pensato per startup, setup ~€0 e go-live <15 giorni) diventa il piano A — *a patto* che
> confermi San Marino.

---

## Stima realistica per Crest (fase pilota)

Su un BaaS startup-friendly, ai tuoi volumi iniziali (qualche centinaio → qualche migliaio di utenti):

| | Mensile stimato |
|---|---|
| Canone / MMC | €500 – €2.500 |
| Carte (es. 300 carte) | una tantum €600 – €3.000 |
| Transazioni + FX | variabile, basso all'inizio |
| **Burn mensile indicativo** | **~€1.000 – €3.000 / mese** all'avvio |

Coerente col business plan (Fase 2, MMC mensile). Su 12 mesi: ~€12k–36k di soli costi
piattaforma, dentro la stima Fase 2 (€30k–120k che include anche lo sviluppo app).

---

## Domande sul prezzo da fare al commerciale
1. C'è un **setup fee** una tantum? Quanto?
2. Qual è il **minimo mensile (MMC)** e come si calcola?
3. Costo per **carta emessa** + eventuale canone mensile carta?
4. Fee per **transazione SEPA** e **markup FX**?
5. Il **KYC** è incluso nell'MMC o si paga a parte (per pratica)?
6. Ci sono **sconti/condizioni per startup** in fase di pre-lancio?

### Fonti
- Benchmark setup BaaS tradizionale £100k–250k+ vs no-code basso (gemba/ge.mba, finextra 2025–26)
- Codego — setup ~€0, go-live <15gg (codegotech.com)
- Modelli pricing BaaS (velmie, crassula, dashdevs 2026)
