# Crest · Kit Instagram

Grafiche pronte da pubblicare per promuovere il lancio di Crest, in linea con il
brand del sito (forest green, parchment, clay; font General Sans; monogramma del Titano).

## Cosa c'è

| File | Tipo | Uso |
|------|------|-----|
| `png/crest-01-teaser` … `12-confine` | Post 1080×1350 (4:5, resi a 2160×2700) | Feed |
| `png/crest-13-avatar` | Quadrato 1080×1080 | Immagine profilo |
| `png/crest-14/15/16-story-*` | Story 1080×1920 (resi a 2160×3840) | Storie |
| `captions.md` | Testo | Didascalie + hashtag + calendario |
| `posts.html` | Sorgente | Design di tutte le grafiche |
| `render.js` | Script | Rigenera i PNG |

I post sono in **4:5 verticale (1080×1350)**: è il formato nativo della nuova
griglia di Instagram, così le anteprime del profilo non vengono tagliate e
occupano più spazio nel feed. I PNG sono a **2×** per nitidezza: Instagram li
ridimensiona da solo.

## Rigenerare / modificare

Modifica testi e colori in `posts.html`, poi:

```bash
cd marketing/instagram
node render.js        # riscrive i PNG in png/
```

Ogni grafica è un `<div class="slide" data-slide="nome">`: lo script fa uno
screenshot di ciascuna a piena risoluzione. Per aggiungerne una nuova, duplica
un blocco e dai un nuovo `data-slide`.

## Palette
Per un feed coeso le superfici scure usano il **verde profondo** del brand
(non il nero): la griglia del profilo resta uniforme e on-brand.
- forest `#1E3A2F` · forest-dark `#16291F` · verde profondo `#13281E`
- parchment `#F4EDE0` · clay (accento) `#C2603A`
- font: **General Sans** (display) + Zodiak italic (citazioni)
