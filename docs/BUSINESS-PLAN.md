# Crest — Business plan & modello di ricavi (bozza)

> Bozza di lavoro per Fase 1, Step 2. Serve per il colloquio con ConnectPay e per eventuali
> investitori. **Tutti i numeri sono ipotesi da validare** — sono ordini di grandezza
> realistici, non promesse. Valuta i prezzi e le penetrazioni con dati tuoi.

---

## 1. Executive summary

**Crest** è un wallet digitale (conto con IBAN, carta, trasferimenti istantanei) costruito
per i residenti della **Repubblica di San Marino**, un mercato che Revolut, Wise e N26 non
servono perché San Marino è fuori dallo Spazio Economico Europeo.

Crest opera in **white-label sulla licenza EMI di ConnectPay** (modello BaaS), senza bisogno
di una licenza bancaria propria. Questo permette di lanciare con capitale ridotto e
compliance gestita dal partner.

**Posizionamento:** il primo (e per ora unico) wallet pensato *per* San Marino. Vantaggio da
"first mover" in un mercato piccolo ma totalmente scoperto.

---

## 2. Mercato

| Segmento | Stima |
|---|---|
| **TAM** — residenti San Marino | ~34.000 |
| + diaspora sammarinese / lavoratori frontalieri | qualche migliaio |
| + imprese sammarinesi (potenziale conto business, Fase 2+) | ~5.000 aziende |
| **SAM** — adulti bancabili interessati a un wallet digitale | ~18.000–22.000 |
| **SOM** — quota realistica a 3 anni (15–30% del SAM) | **3.000–6.000 utenti** |

> Il mercato è **piccolo ma blindato**: nessun concorrente diretto. La sfida non è battere
> Revolut, è **convincere i sammarinesi a fidarsi e iscriversi**. La waitlist (Step 1) misura
> esattamente questo.

---

## 3. Modello di ricavi (5 fonti)

| # | Fonte | Come funziona | ARPU stimato /mese |
|---|-------|---------------|--------------------|
| 1 | **Abbonamenti tier** | Piani Plus/Premium a canone mensile | €1,50 – €2,00 |
| 2 | **Interchange carte** | Quota sulle commissioni di pagamento (share da ConnectPay) | €0,40 – €0,80 |
| 3 | **Cambio valuta (FX)** | Markup sui cambi fuori SEPA | €0,20 – €0,40 |
| 4 | **Carta fisica** | Fee una tantum di emissione/spedizione | una tantum €5–10 |
| 5 | **Servizi premium** | Prelievi extra-soglia, conti business (Fase 2+) | crescente |

**ARPU blended stimato: €2,50 – €3,30 per utente attivo / mese** (~€30–40/anno).

---

## 4. Piani (pricing proposto)

| Piano | Prezzo | Target | Contenuto |
|-------|--------|--------|-----------|
| **Standard** | Gratis | Tutti (acquisizione) | IBAN, carta virtuale, trasferimenti SEPA, app |
| **Plus** | €4,99/mese | Uso quotidiano | Carta fisica inclusa, limiti più alti, cambio valuta agevolato |
| **Premium** | €9,99/mese | Power user / business owner | Carta metallo, supporto prioritario, cashback, assicurazioni |

**Mix atteso a regime:** ~70% Standard · ~25% Plus · ~5% Premium.

---

## 5. Unit economics

| Metrica | Valore stimato | Note |
|---|---|---|
| **ARPU** | €30–40 / utente / anno | media ponderata sui piani + interchange + FX |
| **CAC** (costo acquisizione) | €5–15 / utente | basso: organico social + waitlist + passaparola locale |
| **Costo variabile** (ConnectPay + KYC) | €12–20 / utente / anno | MMC + fee per-transazione + onboarding |
| **Margine di contribuzione** | €12–25 / utente / anno | ARPU − costi variabili |
| **LTV** (vita media 3 anni) | €40–75 / utente | margine × durata |
| **Rapporto LTV/CAC** | ~3–8× | sano se >3× |

---

## 6. Proiezione 24 mesi (scenario BASE)

| Periodo | Utenti attivi | Ricavi annui | Costi annui | Risultato |
|---------|--------------|--------------|-------------|-----------|
| **Lancio (M0–M6)** | 300 → 800 (pilot) | ~€8.000 | ~€60.000 | 🔴 −€52.000 |
| **Anno 1** | 1.500 (media) | ~€45.000 | ~€90.000 | 🔴 −€45.000 |
| **Anno 2** | 4.000 (media) | ~€130.000 | ~€120.000 | 🟢 +€10.000 |

> Voci di costo: ConnectPay (MMC + tx), manutenzione app, marketing, società/legale,
> 1–2 persone part-time. **Break-even operativo stimato intorno ai 3.500–4.500 utenti attivi.**

### Scenario OTTIMISTICO (penetrazione più alta + conti business)
- Anno 2: 6.000+ utenti consumer + 300 conti business → ricavi €200k+, utile più solido.

### Scenario PRUDENTE
- Adozione lenta → break-even slittato all'Anno 3. Sostenibile se i costi fissi restano bassi.

---

## 7. Fabbisogno di capitale

| Voce | Importo |
|---|---|
| Già disponibile (tuo) | **€30.000** |
| Fabbisogno totale fino al break-even | **€120.000 – €200.000** |
| **Gap da coprire** | **€90.000 – €170.000** |

**Come coprire il gap:** piccolo round (business angel locali), bandi/incentivi San Marino
per startup innovative, reinvestimento dei primi ricavi, o sviluppo dilazionato nel tempo
per ridurre il burn iniziale.

---

## 8. Leve che migliorano il modello

1. **Conti business** (~5.000 aziende sammarinesi): ARPU molto più alto del consumer.
2. **First mover**: in un mercato senza concorrenti, la quota può salire oltre il 30%.
3. **CAC bassissimo**: mercato concentrato, passaparola fortissimo, PR locale gratuita.
4. **Costi fissi snelli**: white-label ConnectPay → niente team bancario interno.

## 9. Rischi principali

| Rischio | Mitigazione |
|---|---|
| ConnectPay non serve San Marino (fuori SEE) | ⚠️ Verifica #1 prima di tutto (vedi email partner) |
| Mercato troppo piccolo per profitto pieno | Aggiungere conti business + servizi premium |
| Adozione lenta / diffidenza | Waitlist, PR locale, fiducia, carta fisica come status |
| Costi di sviluppo oltre stima | MVP snello, sviluppo per fasi |

---

## 10. Una pagina per ConnectPay/investitori (sintesi)

> **Crest** — il primo wallet digitale per San Marino (34.000 residenti, 0 concorrenti).
> White-label su licenza EMI ConnectPay. Lista d'attesa già attiva su crestpay.app.
> Modello: abbonamenti + interchange + FX. Break-even ~4.000 utenti. Fabbisogno €120–200k.
> Cerchiamo: conferma copertura San Marino + condizioni di onboarding.

*Bozza — da aggiornare con i dati reali della waitlist e le condizioni effettive di ConnectPay.*
