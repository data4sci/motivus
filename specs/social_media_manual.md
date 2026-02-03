# **MOTIVUS — Manuál pro sociální média (Instagram)**

Tento dokument definuje technická a obsahová pravidla pro Instagram značky **MOTIVUS**. Vizuální pravidla přebírá z `specs/vizualni_manual.md`. Obsahové principy vycházejí z `specs/manifest.md` a `specs/hodnoty.md`.

---

## 1) Scope a cíle

### Co tímto manuálem řešíme
- obsahové formáty (Feed / Stories / Reels)
- export a technické parametry (rozlišení, safe-area, formáty souborů)
- copywriting pravidla (bez marketingové manipulace, bez zdravotních tvrzení)
- workflow a kontrolní kroky (QA před publikací)

### Cíle komunikace
1. **Konzistence značky:** rozpoznatelnost a jednotný vizuální systém.
2. **Důvěryhodnost:** věcný, respektující tón bez slibů a bez tlaku.
3. **Konverze bez nátlaku:** odkaz v bio / waitlist / akce / newsletter.

### Co neděláme (striktně)
- časový nátlak („poslední šance“, „už jen“) a manipulativní taktiky
- zdravotní/terapeutická tvrzení a „léčebné“ sliby
- krizové poradenství přes DM/komentáře
- komunikujeme v souladu se stanovami: činnost spolku **není poskytováním zdravotních služeb**

---

## 2) Obsahová strategie (prakticky)

### Doporučená frekvence (udržitelná)
- Feed: **2–3× týdně**
- Stories: **3–5× týdně**
- Reels: **0–1× týdně** (jen pokud udržíme kvalitu)

### Doporučený mix (orientačně)
- **50–60 %** krátké sdělení / myšlenka / hodnoty
- **20–30 %** edukace (věcně, bez „návodů na život“)
- **10–20 %** komunita + pozvánky (akce, waitlist, newsletter)

### Metriky, které sledujeme (minimální sada)
- Feed: **saves**, **shares**, **profile visits**
- Stories: **completion rate** (dokončení), **link clicks**, **replies**
- Reels: **watch time**, **retention**, **shares**
- Konverze: kliky na link v bio (ideálně s UTM)

---

## 3) Copywriting pravidla (věcně)

### Styl
- krátké odstavce (1–2 věty), konkrétní jazyk
- bez superlativů („nejlepší“, „unikátní“, „revoluční“)
- bez imperativů („musíš“, „stačí jen“, „udělej hned“)
- minimum vykřičníků, minimum emoji

### Struktura captionu (doporučená)
1) **První řádek:** jasná věta / kontext (bez clickbaitu)  
2) **Hlavní část:** 3–8 řádků, ideálně 1 myšlenka  
3) **Závěr:** otázka nebo jednoduché pozvání  
4) **CTA (volitelné):** „Odkaz je v bio.“ / „Napište nám do DM.“

### Zdravotní a bezpečnostní rámec
- nepoužívat diagnostická slova jako „léčba“, „vyléčíme“, „terapie“ (pokud nejde o přesný kontext a kompetenci)
- nepřisuzovat obsahu účinky na psychické poruchy nebo zdravotní stav

---

## 4) Vizuální systém (barvy, typografie, prvky)

### Barvy (sRGB, bez #FFFFFF)
- **Paper White:** `#FAF9F7` (pozadí)
- **Earth Black:** `#2D2A26` (text)
- **MOTIVUS Brown:** `#8B7355` (akcent, linky, logo)
- **Forest Green:** `#3A4A38` (akcent, témata Rodiny)
- **Stone Grey:** `#E5E2DD` (jemné linky, rámy)

### Typografie (IG grafika)
- Serif (headline/citát): **Cormorant Garamond** (fallback Times New Roman)
- Sans (info text): **Inter** / Montserrat
- Pravidlo: **max 2 fonty na vizuál** (Serif + Sans)

### Linka a efekty
- Stroke: **1–2 px** (bez stínů, bez glow, bez 3D)
- Textury: jen velmi jemné (papírový grain), pokud nezhoršují čitelnost

### Logo a ikonografie
- Profilová fotka: hlavní symbol / logo, čitelné v malém
- Pilíře používat jako „tag“ tématu:
  - Mužské / Ženské kruhy: primárně **MOTIVUS Brown**
  - Rodiny: primárně **Forest Green**
- Logo nepoužívat jako vodotisk na každém vizuálu

---

## 5) Technické parametry (rozměry, export, safe-area)

### Feed (doporučené)
- **4:5**: 1080×1350 (primární)
- **1:1**: 1080×1080 (alternativa)

**Export**
- Fotografie: JPEG, sRGB, kvalita cca 80–90 (dle nástroje), bez přepalů
- Typografika/ilustrace: PNG, sRGB (aby text a linky zůstaly čisté)

### Stories / Reels (9:16)
- 1080×1920 (9:16), sRGB

**Safe-area (praktické defaulty)**
- zleva/zprava: min. **120 px**
- shora: min. **250 px**
- zdola: min. **320 px**

Pozn.: UI Instagramu se mění, proto platí pravidlo „důležité prvky drž uprostřed“ + otestuj náhled na telefonu.

### Reels (video)
- 1080×1920, H.264, AAC
- 30 fps (nebo 25 fps, pokud je zdroj 25), stabilní bitrate (ne extrémní komprese)
- Titulky přímo ve videu nebo přes IG, vždy čitelné a s kontrastem

### Doporučené typografické velikosti (pro 1080px šířku)
Feed 1080×1350:
- headline: **72–96 px**
- body: **36–48 px**

Stories/Reels 1080×1920:
- headline: **80–110 px**
- body: **40–54 px**

---

## 6) Šablony a pojmenování souborů (aby se v tom dalo pracovat)

### Doporučený naming (export)
- `YYYY-MM-DD_ig_feed_<tema>_v01.jpg|png`
- `YYYY-MM-DD_ig_story_<tema>_v01.jpg|png`
- `YYYY-MM-DD_ig_reels_<tema>_v01.mp4`

### Highlights (obálky)
- 1080×1920, jednoduché: plné pozadí + tenký kruh + ikona pilíře
- názvy highlightů 1–2 slova (např. „Kruhy“, „Rodiny“, „Praxe“, „Akce“)

---

## 7) Linky, CTA, hashtagy

### CTA (bez tlaku)
- „Odkaz je v bio.“
- „Pokud chcete, napište do DM.“

### UTM (doporučení)
Používej konzistentní UTM pro link v bio / akce:
- `utm_source=instagram`
- `utm_medium=social`
- `utm_campaign=<nazev_kampane>`
- `utm_content=<format>` (např. `feed`, `story`, `reels`)

### Hashtagy
- 3–8 relevantních hashtagů (bez dlouhých seznamů)
- 1–2 brandové + zbytek tematické/lokální

---

## 8) Community management (SLA, moderace, eskalace)

### Odpovědi (SLA)
- komentáře: ideálně do **24 h**
- DM: ideálně do **48 h**

### Moderace
Mazat/skrýt obsah, který:
- napadá, ponižuje, vyvolává konflikt
- porušuje soukromí účastníků
- šíří nenávist nebo dezinformace

### Krizové situace
Pokud zpráva naznačuje bezprostřední ohrožení:
- nepokračovat v „poradenství“ přes chat
- doporučit okamžitou odbornou pomoc (v ČR např. **112** / **155**) a kontakt blízké osoby

---

## 9) Přístupnost (minimální standard)

- alt text (popis scény + smysluplný kontext)
- kontrast: text musí být čitelný (ne jemný text na rušném pozadí)
- titulky u videa vždy

---

## 10) Workflow (od nápadu po publikaci)

1) brief (téma, formát, cíl, CTA)  
2) draft textu + vizuálu  
3) interní kontrola (tón, fakta, právní/etické okraje)  
4) export (správný formát a safe-area)  
5) QA na telefonu (čitelnost, ořez, UI překryvy)  
6) publikace / plánování  
7) vyhodnocení (min. 1× týdně: co fungovalo a proč)

---

## 11) Publikační checklist (rychlý)

- bez zdravotních tvrzení a bez slibů
- bez urgency a bez manipulativních CTA
- barvy a typografie dle `specs/vizualni_manual.md`
- safe-area ok (Feed okraje, Stories UI rezerva)
- alt text / titulky doplněné
- linky a UTM ok (pokud je relevantní)
- souhlas s fotkami/obsahem (pokud jsou lidé identifikovatelní)

---

## 12) Obsahové šablony (rychlé použití)

### A) Pozvánka na akci (carousel 4:5, 3–5 slidů)
1) **Název + datum** (stručně)  
2) **Pro koho / co čekat** (3 body)  
3) **Prakticky:** čas, místo, cena/doporučený příspěvek (pokud je), kapacita (bez „už jen“)  
4) **Jak se přihlásit:** odkaz v bio / DM  

### B) FAQ (carousel 4:5, 4–7 slidů)
1) otázka (jedna na slide)  
2) odpověď (max 3–5 řádků)  
3) „co to není“ (vymezení očekávání)  
4) CTA (volitelné): „Napište nám, pokud řešíte konkrétní situaci.“

### C) Shrnutí / reportáž (Feed 4:5 nebo Stories)
- 1 fotka „atmosféra“ (bez identifikovatelných lidí bez souhlasu)  
- 3 fakta: co / kdy / kde  
- 1 věta kontextu + 1 věta „co dál“ (next termín / odkaz)

### D) Jednovětá grafika (Feed 4:5)
- max ~8–12 slov na vizuálu
- 2–4 řádky, vysoký kontrast, velké okraje

---

*Datum aktualizace: Únor 2026*
