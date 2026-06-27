# Crest — Quale BaaS usare: decisione e classifica

> Sintesi decisionale (giu 2026). Verità di fondo: **nessun BaaS dichiara pubblicamente
> "serviamo i residenti di San Marino"** — è la conseguenza del fatto che SM è fuori dal SEE.
> Quindi "il BaaS perfetto" è quello che supera l'unico cancello critico (servire residenti
> SM) tra una rosa ristretta di candidati forti. Sotto: la rosa, il punteggio, e chi contattare per primo.

---

## I criteri di Crest (in ordine di importanza)

| # | Criterio | Perché |
|---|----------|--------|
| **A** | **Serve i residenti di San Marino** (fuori SEE) | ⛔ Cancello assoluto: senza questo, tutto il resto è inutile |
| **B** | Onboarda una società piccola/nuova (no minimi enormi) | Sei pre-lancio con €30k |
| **C** | **White-label vero** (carta + app col brand Crest) | Crest deve essere Crest, non il marchio del partner |
| **D** | Carte (Visa/MC) + IBAN + SEPA via API | Funzionalità core del prodotto |
| **E** | Compliance-as-a-Service (KYC/AML inclusi) | Ti toglie la voce di costo più cara |
| **F** | Costi sostenibili / bassi minimi | Budget ridotto |
| **G** | Velocità di lancio | Time-to-market |

---

## Matrice di confronto (rosa finale)

| Provider | A · Serve SM | B · Startup-friendly | C · White-label | D · Carte+IBAN | E · KYC incluso | F · Costi | G · Velocità |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Unlimit BaaS** 🌍 | ❓ probabile (globale, non solo SEE) | 🟡 | ✅ | ✅ | ✅ | 🟡 | ✅ <90gg |
| **Codego** 🇲🇹 | ❓ da confermare | ✅ | ✅ (col tuo logo) | ✅ | ✅ | ✅ | ✅ <15gg |
| **Genome** 🇱🇹 | ✅ serve clienti SM (da directory) | ✅ | 🟡 (è prima un neobank diretto) | ✅ | ✅ | 🟡 | 🟡 |
| **Bilderlings** 🇬🇧 | ✅ serve clienti SM | 🟡 | 🟡 | ✅ | ✅ | 🟡 | 🟡 |
| ConnectPay / Swan / Narvi | ❌ solo SEE | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

Legenda: ✅ sì/forte · 🟡 parziale/da verificare · ❓ ignoto · ❌ no

---

## 🏆 La decisione

Non esiste un solo nome "certificato" perché il cancello A si verifica **solo contattandoli**.
Ma la strategia ottimale è chiara: **contattare i 3 finalisti in parallelo** e lasciare che
sia la risposta a incoronare il vincitore. Ordine di priorità:

### 1° — Unlimit BaaS 🌍 (il più promettente)
- **Perché primo:** è l'unico **globale** (Europa, UK, LATAM, APAC, India, Africa), non
  vincolato al passaporto SEE → strutturalmente **il più probabile a poter servire SM**.
- White-label card issuing (Visa/MC/UnionPay) + IBAN multivaluta via API.
- ⚠️ Da verificare che accetti una società piccola/nuova senza minimi alti.

### 2° — Codego 🇲🇹 (il più adatto a una startup)
- **Perché:** white-label completo **col tuo logo**, IBAN UE + carte, compliance+KYC in
  un'unica API, **senza licenza né membership Visa/MC**, live in **<15 giorni**. Pensato
  esattamente per chi parte da zero.
- ⚠️ Cancello A (residenti SM) tutto da confermare.

### 3° — Genome 🇱🇹 (il più "provato" su SM)
- **Perché:** è l'unico per cui abbiamo **evidenza che serve clienti sammarinesi** oggi.
- ⚠️ White-label meno profondo (nato come neobank diretto): va chiarito quanto Crest sia
  visibile rispetto a Genome.

> **Riserva strutturale (Strada A):** un **istituto di pagamento sammarinese già licenziato**
> resta l'opzione che supera il cancello A per definizione. Da tenere come piano B se i tre
> finalisti dovessero dire no sui residenti SM.

---

## Come si decide il vincitore (processo)
1. Invia a **Unlimit, Codego, Genome** la stessa email con le **4 domande** (sotto).
2. Scarta chi dice no al cancello A (residenti SM).
3. Tra i "sì", scegli su: profondità white-label (C) → costi/minimi (F) → velocità (G).
4. Il primo che è ✅ su A + C + F **è il tuo BaaS perfetto.**

## Le 4 domande decisive (cancelli)
1. **Società SM:** potete onboardare una società costituita a San Marino (o serve entità UE)?
2. **Residenti SM:** potete servire clienti finali **residenti a San Marino** (fuori SEE) in modo continuativo?
3. **BCSM/PSSS:** siete già registrati presso la Banca Centrale di San Marino o disposti a registrarvi (regime "senza stabile organizzazione"), con Crest come agente/distributore?
4. **White-label:** offrite white-label **completo** (carta e app col brand Crest, voi invisibili al cliente) o solo API col vostro marchio? E con quali costi (setup, canone, fee carta)?

### Contatti
- **Unlimit BaaS** → baas.unlimit.com/contacts
- **Codego** → codegotech.com
- **Genome** → genome.eu (sales/business)
- (riserva) **Bilderlings** → bilderlings.com

### Fonti
- Unlimit BaaS — copertura globale e white-label issuing (baas.unlimit.com)
- Codego — white-label BaaS Malta, IBAN+carte, <15gg (codegotech.com, velmie/gemba 2026)
- Genome / Bilderlings — EMI che servono SM (neolista.com/countries/san-marino, giu 2026)
- Esclusi per cancello A: ConnectPay, Wallester, Striga, Paysera (coperture SEE/verificate)
