# Crest — Piano finanziario e roadmap per fasi

> Documento di pianificazione. Stime in euro basate su ricerca di mercato (giugno 2026).
> Le cifre regolamentari di San Marino vanno confermate con un colloquio diretto con **BCSM**
> (Banca Centrale della Repubblica di San Marino) e un legale specializzato.

---

## ⚠️ La verità che cambia tutto: il muro regolamentare

Crest, per **erogare davvero** conti con IBAN, carta e pagamenti, deve essere un
**Istituto di Moneta Elettronica (IMEL / EMI)** oppure un **Istituto di Pagamento (IP)**.
Questa è un'attività riservata e vigilata.

Dati confermati dalla ricerca:

| Voce | Importo |
|---|---|
| **Capitale minimo IMEL/EMI** (UE, e San Marino allinea la normativa via Decreto 177/2018 → Direttiva UE 2015/2366) | **€350.000** versati e vincolati |
| **Capitale minimo Istituto di Pagamento** (a seconda dei servizi) | **€20.000 – €125.000** |
| Costi di compliance/personale/legale durante la licenza | **€200.000 – €600.000/anno** (mercati UE) |
| Tempi di autorizzazione | **6 – 18 mesi** |

**Conclusione netta:** con **€30.000** *non* si lancia un istituto di moneta elettronica
proprio. Il solo capitale di vigilanza è oltre 10× quella cifra.

### La strada scelta: Percorso B con ConnectPay ✅
Non serve la licenza propria. Ti appoggi a **ConnectPay**, un istituto **già licenziato**,
in modello **BaaS / white-label**. Niente €350k di capitale proprio.

- **Percorso A — Licenza propria (IMEL).** Controllo totale, ma €500.000–800.000+. Scartato per ora.
- **Percorso B — ConnectPay (BaaS).** ✅ **Scelto.** Vedi sezione dedicata sotto.

I **€30.000 servono a finanziare le Fasi 0→2** (validazione, audience, MVP, base legale
e onboarding ConnectPay) e a presentarti pronto al partner o a un investitore.

---

## 🏦 ConnectPay — il partner scelto (analisi)

**Cos'è:** UAB ConnectPay, **Istituto di Moneta Elettronica licenziato in Lituania**
(EMI n. 24, vigilato dalla Banca Centrale di Lituania). Offre BaaS, IBAN, carte white-label.

### Cosa ti dà (e ti fa risparmiare)
| Vantaggio | Effetto sul budget |
|---|---|
| **Compliance-as-a-Service**: KYC, onboarding, monitoraggio AML/CTF, reporting alle autorità | ❌ Elimini il costo di un team compliance interno (€30k–100k/anno risparmiati) |
| **Cards-as-a-Service**: emetti carte Visa brandizzate sulla *loro* licenza | ❌ Niente rapporto diretto con i circuiti (Visa/Mastercard) né capitale |
| **White-label neobank** sulla loro licenza EMI | ❌ Niente licenza propria → niente €350k di capitale |
| IBAN multi-valuta (80+ valute), SEPA + SWIFT | Funzionalità core pronte via API |

### ⚠️ IL PUNTO CRITICO da verificare SUBITO
ConnectPay ha "**passaportato**" la licenza nei **30 paesi dello Spazio Economico Europeo (SEE)**.
**San Marino NON fa parte del SEE.** Gli IBAN emessi sono con **prefisso LT (Lituania)**.

> Questo è **esattamente lo stesso muro** per cui Revolut e Wise non aprono conti ai
> sammarinesi. Prima di qualsiasi altra spesa devi avere conferma scritta da ConnectPay che:
> 1. possono fare **onboarding di una società sammarinese**, e
> 2. possono **servire clienti finali residenti a San Marino** (fuori SEE).

Se la risposta è sì → il piano regge e i costi crollano. Se è no → serve un partner
diverso o una struttura societaria UE. **È la domanda numero uno da fare.**

### 🔑 Chi deve essere autorizzato da BCSM?
A San Marino i servizi di pagamento/moneta elettronica sono **attività riservata** (Legge
165/2005): non si possono offrire ai residenti senza autorizzazione BCSM. **Ma non serve
per forza che sia Crest ad avere una licenza propria.** La normativa ammette che un
operatore estero (ConnectPay) operi in regime **"senza stabile organizzazione" (PSSS)**,
anche **tramite un agente/distributore locale** — cioè Crest.

| Scenario | Praticabile? |
|---|---|
| ConnectPay registrato PSSS presso BCSM + Crest agente | ✅ percorso pulito |
| Crest chiede autorizzazione propria a BCSM | ✅ ma più oneroso |
| Vendere ai sammarinesi senza autorizzazione di nessuno | ❌ illegale (abusivismo) |
| Pivot su soli clienti UE/SEE | ⚠️ legale ma snatura il progetto |

A fine 2023 risultavano **5 imprese estere già autorizzate** per i servizi di pagamento in
regime PSSS: **la strada esiste ed è battuta.** La vera incognita è se ConnectPay è già
registrato o disposto a registrarsi presso BCSM con Crest come agente (3ª domanda nell'email).

### Costi ConnectPay (modello)
- Application processing: gratis (o **€100** per entità complesse)
- **Minimum Monthly Commitment (MMC)**: paghi un minimo mensile; se le fee reali sono sotto
  la soglia, paghi la differenza → da concordare in onboarding (tipico €500–2.000/mese)
- Pay-in eurozona gratis, pay-out €0,25, emissione e canone carte a listino
- Pricing finale **su misura**, definito al momento dell'onboarding in base ai volumi previsti

---

## Le fasi del progetto

### FASE 0 — Fondazione & Identità ✅ ~90% COMPLETATA
**Obiettivo:** esistere, avere un'identità credibile e un canale per raccogliere interesse.

| Attività | Stato |
|---|---|
| Nome, logo, palette, identità di marca (Crest / CrestPay · "Libertas") | ✅ Fatto |
| Sito di lancio multipagina (home, FAQ, chi siamo, contatti, legali) | ✅ Fatto |
| Form lista d'attesa + backend (Supabase) + email di benvenuto (Resend) | ✅ Fatto |
| Dominio `crestpay.app` + HTTPS/SSL | ✅ Fatto (DNS in propagazione) |
| Contenuti social (37 post/storie Instagram + caption + calendario) | ✅ Fatto |
| Analytics (Vercel) | ✅ Fatto |
| Profili social ufficiali attivi (IG/LinkedIn) | ⏳ Da aprire |

**Spesa Fase 0 (reale finora):** ~**€100 – €1.500**
(dominio ~€15–40/anno, hosting Vercel gratis/€20 mese, Resend gratis fino a 3k email,
Supabase gratis allo start. Il grosso è stato tempo, non denaro.)

---

### FASE 1 — Validazione & Base legale ⏳ PROSSIMA (~15% avviata)
**Obiettivo:** dimostrare che esiste domanda reale e mettere le fondamenta legali.

| Attività | Stima costo |
|---|---|
| Crescita lista d'attesa a **1.000–3.000 iscritti** (prova di domanda) | incluso in ADV sotto |
| Apertura società a San Marino (costituzione, notaio, capitale sociale base) | €3.000 – €8.000 |
| Consulenza legale/regolamentare iniziale + colloquio esplorativo con BCSM | €2.000 – €6.000 |
| Business plan finanziario + modello (per partner/investitori) | €0 – €3.000 |
| Piccola campagna ADV locale per riempire la waitlist | €1.000 – €4.000 |
| Profili social + primo content marketing organico | €0 – €1.000 |
| **Totale Fase 1** | **€6.000 – €22.000** |

**Difficoltà:** 🟡 Media. Il punto critico è il colloquio con BCSM: capire se
preferiscono un IP o un IMEL e quali condizioni pongono per un nuovo operatore.

---

### FASE 2 — Partner & MVP del prodotto ⏳ (~0%)
**Obiettivo:** avere un'app funzionante (anche in beta chiusa) appoggiata a un partner licenziato.

| Attività | Stima costo |
|---|---|
| Onboarding ConnectPay (due diligence, contratti, application fee) | €100 – €5.000 |
| Integrazione tecnica API ConnectPay (IBAN, carte, SEPA) | €5.000 – €20.000 |
| Minimum Monthly Commitment ConnectPay | €500 – €2.000 / mese |
| Sviluppo **MVP app** (iOS + Android + backend) — KYC/AML **inclusi** da ConnectPay | €25.000 – €90.000 |
| Beta chiusa con utenti dalla waitlist | incluso |
| **Totale Fase 2** | **€30.000 – €120.000** |

> Con ConnectPay la compliance (KYC/AML) è inclusa: si risparmia la voce più cara.
> Con white-label "leggero" e un MVP essenziale si sta nella fascia bassa.

**Difficoltà:** 🔴 Alta. Qui i €30k iniziali iniziano a non bastare: serve o un piccolo
round, o entrate, o spalmare lo sviluppo nel tempo. È lo scoglio principale di budget.

---

### FASE 3 — Compliance, capitale & autorizzazione ⏳ (~0%)
**Obiettivo:** essere legalmente abilitati a operare (in proprio o tramite partner).

Con **ConnectPay** la maggior parte del peso regolamentare è sul partner (Compliance-as-a-Service):
reporting, AML, vigilanza li gestisce ConnectPay sulla sua licenza. A te restano:

| Voce a tuo carico | Stima |
|---|---|
| Eventuale ruolo AML/referente interno (part-time/consulente) | €0 – €20.000/anno |
| Audit/legale per il contratto di distribuzione e i termini verso i clienti | €3.000 – €15.000 |
| Adeguamenti privacy/GDPR e termini di servizio definitivi | €1.000 – €5.000 |
| **Totale Fase 3 (Percorso B / ConnectPay)** | **€5.000 – €40.000** |

**Difficoltà:** 🔴 Alta — ma molto più gestibile che con licenza propria, perché il
capitale di vigilanza e il grosso della compliance li copre ConnectPay.
Il vero rischio qui non è il costo, è la **risposta di ConnectPay sul punto San Marino/SEE**.

---

### FASE 4 — Lancio pubblico, App Store & ADV ⏳ (~0%)
**Obiettivo:** aprire al pubblico, acquisire i primi clienti paganti.

| Attività | Stima costo |
|---|---|
| Pubblicazione App Store + Google Play (account dev) | €100 una tantum + €25 |
| Hardening sicurezza, penetration test, audit pre-lancio | €5.000 – €20.000 |
| Carte fisiche (produzione + spedizione primi lotti) | €3 – €10 / carta |
| **Campagna ADV di lancio** (Meta/Google + influencer locali) | €10.000 – €50.000 |
| Customer support iniziale | €1.000 – €4.000 / mese |
| **Totale Fase 4** | **€20.000 – €80.000+** |

**Difficoltà:** 🟡 Media-alta. Più una questione di budget marketing che tecnica.

---

## Quadro generale: quanto serve davvero

| Percorso | Budget realistico per arrivare al lancio |
|---|---|
| **B — ConnectPay (BaaS)** ✅ scelto | **€70.000 – €200.000** |
| A — Licenza propria IMEL | €500.000 – €900.000+ |

Somma indicativa Percorso B: Fase 1 (€6–22k) + Fase 2 (€30–120k) + Fase 3 (€5–40k) +
Fase 4 (€20–80k) ≈ **€60k–260k**, con un realistico **€70k–200k** in versione snella.

### E i tuoi €30.000?
- ✅ **Bastano** per completare **Fase 0** (già quasi fatta), l'intera **Fase 1**, e per
  **avviare** l'onboarding ConnectPay + l'inizio dell'MVP (parte bassa della Fase 2).
- ❌ **Non bastano da soli** ad arrivare al lancio: mancano circa **€40k–170k**.
- 🎯 Il loro vero scopo: portarti al punto in cui hai **waitlist numerosa + società +
  accordo ConnectPay firmato + MVP avviato**. Con questo in mano i €40k–170k mancanti
  diventano molto più facili da coprire (un piccolo round, business angel, bando, o
  reinvestendo i primi ricavi). Sei tu a decidere quanto velocemente spingere.

---

## Dove siamo: % di avanzamento

```
Fase 0  Fondazione & Identità      ██████████████████░░  ~90%
Fase 1  Validazione & Base legale  ███░░░░░░░░░░░░░░░░░░  ~15%
Fase 2  Partner & MVP              ░░░░░░░░░░░░░░░░░░░░░   ~0%
Fase 3  Compliance & Capitale      ░░░░░░░░░░░░░░░░░░░░░   ~0%
Fase 4  Lancio & ADV               ░░░░░░░░░░░░░░░░░░░░░   ~0%
```

**Avanzamento complessivo verso il lancio: ~20–22%**

Sembra poco, ma la Fase 0 è quella che la maggior parte dei progetti non completa mai con
questa qualità: hai già marca, sito, canale di acquisizione e contenuti. La parte "facile e
visibile" è fatta bene. Davanti c'è la parte "difficile e invisibile": legale, partner, capitale.

---

## Fasi per difficoltà

| Fase | Difficoltà | Note |
|---|---|---|
| Fase 0 — Fondazione | 🟢 Bassa | ✅ Completata |
| Fase 1 — Validazione & legale | 🟡 Media | Prossimo passo: BCSM + società |
| Fase 2 — Partner & MVP | 🔴 Alta | Primo scoglio di budget |
| **Fase 3 — Compliance & capitale** | 🔴🔴 **Massima** | **La fase decisiva**: qui serve il capitale grosso |
| Fase 4 — Lancio & ADV | 🟡 Media-alta | Questione di budget marketing |

---

## Prossime 3 mosse consigliate (a costo quasi zero)

1. **🔴 PRIORITÀ ASSOLUTA — Contattare ConnectPay** (sales/partnership) e fare LE due domande:
   *«Potete fare onboarding di una società sammarinese? Potete servire clienti finali
   residenti a San Marino, fuori SEE?»* Da questa risposta dipende tutto il piano.
2. **Aprire i profili social ufficiali** e pubblicare i contenuti già pronti → far crescere
   la waitlist (la prova di domanda è l'arma con ConnectPay e con eventuali investitori).
3. **Colloquio con un legale sammarinese + BCSM**: confermare se una società locale che
   distribuisce un EMI estero (ConnectPay) verso residenti necessita di una registrazione/
   notifica presso BCSM, e a quali condizioni.

---

### Fonti consultate
- BCSM — Regolamento 2020-04 servizi di pagamento e moneta elettronica (bcsm.sm)
- Camera di Commercio San Marino — Country profile 2025 (camcom.sm)
- Direttiva UE 2009/110/CE (EMD2), art. 4 — capitale minimo €350.000
- ConnectPay — pricing, BaaS docs, white-label cards, profilo EMI (connectpay.com, thebanks.eu)
- Ricerca di mercato BaaS 2026 (ConnectPay, Swan, Solaris, Crassula)
- Stime sviluppo MVP fintech 2025 (WebMobTech, Aalpha, DashDevs)
