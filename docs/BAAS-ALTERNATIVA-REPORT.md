# Crest — Report: alternativa BaaS a ConnectPay che copre San Marino

> Ricerca giugno 2026. Obiettivo: trovare un partner che onboardi San Marino, in
> sostituzione di ConnectPay (che copre solo il SEE). Le coperture vanno SEMPRE confermate
> per iscritto col provider: nessuno pubblica i dettagli San Marino sul sito.

---

## 1. Cosa ho verificato (e perché molti vanno esclusi)

Il problema è strutturale: i BaaS "passaportati SEE" **non possono servire i residenti
sammarinesi** off-the-shelf, perché San Marino è fuori dallo Spazio Economico Europeo.
Molti hanno pagine "San Marino" che sono **solo SEO automatica**, non copertura reale.

| Provider | Esito | Evidenza |
|---|---|---|
| **ConnectPay** | ❌ no SM | EMI lituano, solo SEE; SM non tra le sedi |
| **Wallester** | ❌ no SM (business) | Onboarding business solo SEE+UK/UAE/SG/USA/CA |
| **Striga** | ⚠️ dubbio | Crypto-native (VASP estone, MiCA), "30+ paesi SEE", pagine SM = SEO |
| **Paysera** | ❌ no business SM | San Marino in "Unsupported regions" per i conti business |
| **Intergiro** | ❌ fallito | Dichiarato bancarotta il 31/07/2025 |

---

## 2. Chi accetta DAVVERO San Marino oggi

Da una directory aggiornata (neolista, giu 2026) dei servizi che operano a San Marino, i
provider con licenza che onboardano clienti sammarinesi sono:

| Provider | Tipo | Note |
|---|---|---|
| **Genome** | EMI (Banca di Lituania) | Conti personali e business, IBAN multivaluta, carte, API. **Miglior candidato.** |
| **Bilderlings** | EMI (UK/Lettonia) | Conti business + carte |
| **Wise / Payoneer** | EMI | Conti multivaluta, ma **non white-label** (non ci costruisci sopra Crest) |

> Wise/Payoneer servono il cliente finale ma non ti danno una piattaforma su cui costruire
> il tuo brand. Per il modello Crest (white-label) i candidati veri sono **Genome** e, in
> seconda battuta, **Bilderlings**.

---

## 3. ✅ Raccomandazione: GENOME (in sostituzione di ConnectPay)

### Profilo
- **Licenza:** Istituto di Moneta Elettronica (EMI) vigilato dalla **Banca di Lituania**.
- **Servizi:** conti IBAN personali e business multivaluta (EUR, USD, GBP +9), carte
  fisiche e virtuali, pagamenti SEPA/SWIFT, **API per integrazione**.
- **San Marino:** risulta tra i mercati serviti (presente nella directory di chi opera a SM).
- **Perché è il sostituto giusto:** stessa categoria di ConnectPay (EMI + cards + IBAN + API),
  ma — a differenza di ConnectPay — **accetta clientela sammarinese**.

### Come Crest lo userebbe (report d'uso)
1. **Crest = front-end e brand** (app + sito già pronti). **Genome = binari regolamentati**
   (conti, IBAN, carte) sotto la sua licenza EMI.
2. Integrazione via **API Genome** / programma white-label: gli utenti Crest aprono un conto
   e ricevono IBAN + carta emessi su licenza Genome.
3. **Compliance (KYC/AML)** gestita dal lato licenziato (Genome), come con ConnectPay.
4. Crest gestisce esperienza, marketing, supporto di primo livello; Genome i flussi regolati.

### Costi attesi (da confermare in onboarding)
- Setup/integrazione + canone mensile (tipico BaaS) + fee per-transazione e per-carta.
- Ordine di grandezza coerente col business plan: **Fase 2 €30k–120k**, MMC mensile.

### Domande aperte (da chiudere prima di firmare)
- Onboarding di una **società sammarinese** o serve entità UE?
- Possono servire **clienti finali residenti SM** in modo continuativo (non solo spot)?
- Serve registrazione **PSSS presso BCSM** o operano già in un regime ammesso?
- Condizioni white-label reali (il loro brand è visibile o no?) e pricing.

---

## 4. Candidati di riserva (da interpellare in parallelo)

| Provider | Perché | Da verificare |
|---|---|---|
| **Bilderlings** | EMI che già serve SM, conti business + carte | Esiste un'offerta white-label/API? |
| **Unlimit BaaS** | BaaS **globale** (Visa/MC/UnionPay), non limitato al SEE, white-label issuing + IBAN | Copertura SM esplicita |
| **Codego** | White-label BaaS, card issuing + IBAN locali | Copertura SM, pricing |

> **Unlimit** è interessante perché è un player *globale* (non solo SEE): per definizione
> tratta geografie fuori dal SEE, quindi è il più probabile "sì" tra le riserve.

---

## 5. Resta valida la Strada A (partner locale)

Il modo **strutturalmente più sicuro** di servire i residenti resta un **istituto di
pagamento/e-money sammarinese già licenziato** (a SM ce ne sono 3, 2 con e-money): hanno
già l'autorizzazione BCSM per i residenti. Vale come piano parallelo a Genome.

---

## 6. Azione consigliata (costo €0)

Inviare le **stesse 3 domande** (già pronte in `connectpay-outreach-email.md`, adattando il
nome) a **Genome** e **Unlimit**, in parallelo:
1. Onboarding di società sammarinese? 2. Servizio a residenti SM (fuori SEE)?
3. Registrazione PSSS presso BCSM già fatta o possibile?

Il primo che risponde "sì" a tutte e tre **sblocca la Fase 2**.

### Contatti
- Genome: tramite genome.eu (sales/business) · Unlimit: baas.unlimit.com/contacts
- Bilderlings: bilderlings.com · Codego: codegotech.com

### Fonti
- Directory neobank attive a San Marino (neolista.com/countries/san-marino, giu 2026)
- Genome — EMI Banca di Lituania (genome.eu)
- Wallester (wallester.com), Striga (striga.com), Paysera (paysera.com) — coperture verificate
- Unlimit BaaS (baas.unlimit.com), Codego (codegotech.com)
