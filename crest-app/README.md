# Crest — App (React Native / Expo)

App mobile nativa di **Crest**, il wallet digitale per i residenti della Repubblica di San Marino. Ricostruzione in **React Native (Expo)** del prototipo high-fidelity, con backend **Supabase** (auth + database).

> Progetto **separato** dal sito di lancio (landing page) nella root del repo. Questo è l'app vera e propria.

## Stack

- **Expo SDK 52** (React Native 0.76, New Architecture)
- **React Navigation 7** — native-stack (auth + flussi) + bottom-tabs (app)
- **Supabase JS v2** — auth email/password, sessione persistita via AsyncStorage
- **expo-linear-gradient** — gradienti carta/header/welcome
- **react-native-svg** — set icone vettoriali
- **react-native-gesture-handler** + **reanimated** — gesti (slide-to-send, prossimo step)
- Font **Schibsted Grotesk** + **Newsreader italic** (`@expo-google-fonts`)

## Avvio

```bash
cd crest-app
npm install        # o: npx expo install   (allinea le versioni native)
npx expo start     # poi 'i' (iOS) / 'a' (Android) / scansiona QR con Expo Go
```

> Se qualche pacchetto nativo segnala una versione non allineata all'SDK, esegui
> `npx expo install` per riconciliare automaticamente.

## Stato (milestone 1)

Implementato in questo primo step — **setup Expo + Supabase auth + Home**:

- ✅ Design tokens (`src/theme/tokens.js`) — palette, font, ombre, `money()`
- ✅ Client Supabase + helper auth/profilo/transazioni (`src/lib/supabase.js`)
- ✅ Componenti condivisi: `Icon`, `Mark`, `Button`/`IconBtn`, `Header`,
  `Avatar`, `TxRow`, `CrestCard` (gradient + chip + sheen + freeze)
- ✅ `AuthContext` — ripristino sessione all'avvio, profilo + movimenti live
- ✅ Schermate: **Splash**, **Welcome**, **Login**, **Registrazione** (signup),
  **Home** (saldo, quick action, teaser carta, mini-spese, ultimi movimenti),
  **Profilo** (identity card + logout)
- ✅ Navigazione root che commuta auth ⇄ app in base alla sessione
- ✅ Tab bar custom (Home / Carta / Analisi / Profilo)

### Prossimi step

Le schermate seguenti sono presenti come placeholder "In arrivo" e verranno
portate fedelmente dal prototipo:

- KYC multi-step (documento, selfie, processing animato)
- Carta (virtuale/fisica, freeze, limiti)
- Analisi spese, Movimenti + dettaglio operazione
- Invia (destinatario → importo → **slide-to-send** → successo), Ricevi (QR/IBAN)
- Cambio valuta (tassi live), Risparmio/Obiettivi, Piani, Notifiche, Roadmap, Conformità

## Struttura

```
App.js                      Caricamento font + providers + gate splash
src/theme/tokens.js         Design tokens (T, FONTS, ff, SHADOW, money)
src/lib/supabase.js         Client Supabase + helper auth/DB
src/context/AuthContext.js  Sessione, profilo, transazioni globali
src/navigation/             RootNavigator (auth/app switch) + CrestTabBar
src/components/             Icon, Mark, Button, Header, Avatar, TxRow, CrestCard
src/data/mock.js            Dati demo (TX, RECIPIENTS, BUDGET)
src/screens/               Splash, Welcome, Login, Register, Home, Profile, Placeholder
assets/                    Logo (forest/cream), icone app, splash
```

## Supabase

Progetto già configurato (URL + anon key in `src/lib/supabase.js`). Tabelle:
`profiles`, `transactions`, `goals`, `admins`. RLS attiva; trigger
`on_auth_user_created` crea la riga `profiles`. La sessione usa
`storageKey: 'crest:session'`.

---

*Crest è un progetto in pre-lancio. Non è una banca né un istituto autorizzato.*
