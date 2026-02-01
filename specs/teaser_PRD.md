# MOTIVUS — Teaser Page

## AI Design Brief v3.0

---

## ESENCE

> Motivus nevolá. Motivus čeká.
> Nevytváříme produkty. Vytváříme prostor.

Tato stránka je **prázdný nádech před prvním krokem**. Návštěvník má pocítit, že přišel na místo, které nespěchá, nemanipuluje, nekřičí. Místo, které prostě *je* — a čeká.

---

## FILOZOFICKÉ JÁDRO

Při tvorbě stránky vycházej z těchto principů:

**RESPEKT K JEDINEČNOSTI**

- Neříkáme lidem, co mají dělat
- Nehodnotíme, nepoučujeme
- Dáváme prostor vlastnímu rozhodnutí

**CELOSTNÍ PŘÍSTUP**

- Člověk = tělo + mysl + emoce
- Design musí oslovit všechny tři roviny
- Vizuál pro tělo, text pro mysl, atmosféra pro emoce

**BEZPEČÍ A DŮVĚRA**

- Žádný tlak, žádná manipulace
- Čistota, jednoduchost, předvídatelnost
- Prostor k zastavení, ne k rozptýlení

**AUTENTICITA**

- Žádné marketingové fráze
- Žádné sliby zázraků
- Upřímnost nad efektem

---

## CÍLOVÝ PROŽITEK

Návštěvník by měl:

1. **Zpomalit** — design vyvolává klid, ne akci
2. **Pocítit zvědavost** — ne strach z promeškání
3. **Cítit se viděn** — ne jako cíl, ale jako člověk
4. **Odejít s otázkou** — "Co je to za místo?"

---

## STRUKTURA STRÁNKY

### 1. HERO — Zastavení

```
┌─────────────────────────────────────┐
│                                     │
│              [symbol]               │
│                                     │
│               STOP.                 │
│                                     │
│        Před restartem života.       │
│                                     │
└─────────────────────────────────────┘
```

**Instrukce pro AI:**

- H1: "STOP." — zobrazit s váhou, může být animovaná pauza před zobrazením
- Podnadpis přichází až po tichu (delay 1.5s nebo scroll-triggered)
- Symbol kruhu: jednoduchý, dýchající (scale 0.98–1.02, period 4s)
- Negativní prostor je součástí sdělení — minimum je maximum

**CZ:** STOP. / Před restartem života.
**EN:** STOP. / Before you restart.

---

### 2. NAPĚTÍ — Tiché sdělení

```
┌─────────────────────────────────────┐
│                                     │
│          Něco se chystá.            │
│                                     │
│     Místo pro lidi, kteří hledají   │
│      skutečný směr, ne další návod. │
│                                     │
└─────────────────────────────────────┘
```

**Instrukce pro AI:**

- Krátké, úderné věty
- Každá věta může být samostatný odstavec
- Fade-in při scrollu (opacity 0→1, duration 800ms)
- Nesmí znít jako reklama — spíš jako zápis z deníku

**CZ:**
Něco se chystá.
Místo pro lidi, kteří hledají skutečný směr, ne další návod.

**EN:**
Something is coming.
A space for people seeking real direction, not another manual.

---

### 3. SYMBOLIKA — Vizuální jazyk

**Archetyp kruhu:**

- Kruh = celek, bezpečí, komunita, návrat k sobě
- Variace: jednotlivec / pár / rodina / komunita
- Kruhy mohou být ve vzájemné gravitaci (gentle orbit)

**Interakce:**

- Hover: jemné rozjasnění, ne dramatická změna
- Žádné klikací akce na symboly
- Symboly mluví samy — bez popisků

**Generuj SVG ikony:**

- Stroke-based, ne filled
- Stroke-width: 1–2px
- Barvy: viz Design Tokens
- Animace: subtle breathing, orbital motion

---

### 4. VÝZVA — Email Waitlist

```
┌─────────────────────────────────────┐
│                                     │
│      Následujte náš kompas.         │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ váš@email.cz            [→] │   │
│   └─────────────────────────────┘   │
│                                     │
│        Žádný spam. Jen směr.        │
│                                     │
└─────────────────────────────────────┘
```

**Instrukce pro AI:**

- Jediný CTA na celé stránce
- Input pole: minimalistické, border-bottom only nebo subtle border
- Tlačítko: ikona šipky nebo kompasu, ne text "Odeslat"
- Po odeslání: "Díky. Ozveme se, až bude čas."
- Error state: "Něco se nepovedlo. Zkuste to znovu."

**CZ:**

- Výzva: "Následujte náš kompas."
- Placeholder: "váš@email.cz"
- Poznámka: "Žádný spam. Jen směr."
- Success: "Díky. Ozveme se, až bude čas."

**EN:**

- Výzva: "Follow our compass."
- Placeholder: "<your@email.com>"
- Poznámka: "No spam. Just direction."
- Success: "Thank you. We'll reach out when the time comes."

---

### 5. STAV — Mikrotext

```
┌─────────────────────────────────────┐
│                                     │
│       • Téměř připraveni •          │
│                                     │
└─────────────────────────────────────┘
```

**Instrukce pro AI:**

- Diskrétní indikátor stavu
- Může být animovaný pulz (dot blink)
- Font-size menší než body text
- Opacity 0.6–0.7

---

### 6. ZÁPATÍ — Existence

```
┌─────────────────────────────────────┐
│   [☀/☾]              [CZ|EN]        │
│                                     │
│        [ig]    [fb]                 │
│                                     │
│         © 2025 MOTIVUS              │
└─────────────────────────────────────┘
```

**Instrukce pro AI:**

- Theme toggle: ikona slunce/měsíce, ne text
- Language toggle: "CZ | EN" nebo vlajky
- Social icons: minimalistické, monochromatické
- Velikost ikon: 20–24px
- Hover: opacity 0.5 → 1

---

## DESIGN TOKENS

### Barvy

```css
/* Light Mode */
--color-bg: #FAF9F7;           /* teplá bílá, jako papír */
--color-text: #2D2A26;         /* zemitá čerň */
--color-text-muted: #6B6560;   /* tlumená šedá */
--color-accent: #8B7355;       /* teplá hnědá, kompas */
--color-border: #E5E2DD;       /* jemná linka */

/* Dark Mode */
--color-bg-dark: #1A1918;      /* hluboká tma */
--color-text-dark: #E8E4DF;    /* měkká bílá */
--color-text-muted-dark: #9B9590;
--color-accent-dark: #C4A77D;  /* zlatavá */
--color-border-dark: #3A3835;
```

### Typografie

```css
--font-heading: 'Inter', 'SF Pro Display', system-ui;
--font-body: 'Inter', 'SF Pro Text', system-ui;

--size-hero: clamp(3rem, 8vw, 6rem);
--size-subheading: clamp(1.25rem, 3vw, 1.75rem);
--size-body: clamp(1rem, 2vw, 1.125rem);
--size-small: clamp(0.75rem, 1.5vw, 0.875rem);

--weight-light: 300;
--weight-normal: 400;
--weight-medium: 500;

--line-height-tight: 1.1;
--line-height-normal: 1.6;
--letter-spacing-wide: 0.05em;
```

### Prostor

```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 8rem;
--space-2xl: 12rem;

/* Vertikální rytmus mezi sekcemi */
--section-gap: clamp(6rem, 15vh, 12rem);
```

### Animace

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 800ms;
--duration-breathing: 4000ms;
```

---

## INTERAKCE

### Povoleno ✓

- Fade-in při scrollu (intersection observer)
- Subtle hover states (opacity, scale max 1.02)
- Breathing animation na symbolu (scale oscillation)
- Smooth scroll behavior
- Theme transition (300ms)

### Zakázáno ✗

- Video pozadí
- Parallax efekty
- Particle systémy
- Zvukové efekty
- Pop-upy a modály
- Více než jeden CTA
- Countdown timery
- "Už jen X míst" urgency

---

## TECHNICKÉ POŽADAVKY

### Stack

- Statický HTML/CSS nebo lehký framework (Astro, 11ty)
- Vanilla JS nebo Alpine.js pro interakce
- Formspree / Netlify Forms pro email capture
- Deployed on Vercel / Netlify

### Performance

- First Contentful Paint < 1s
- Total page weight < 200KB
- Lighthouse score > 95

### Přístupnost

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader friendly
- Reduced motion preference respected

### Responsivita

- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1440px
- Touch-friendly targets (min 44px)

---

## KOPÍROVACÍ BANKA

### Alternativní H1

- "STOP."
- "Zastavte."
- "Moment."
- "Tady."

### Alternativní podnadpisy

- "Před restartem života."
- "Než půjdete dál."
- "Někde začít musíte."
- "Pravda začíná tichem."

### Alternativní teaser texty

- "Místo pro ty, kdo už nechtějí předstírat."
- "Pro lidi hledající klid, ne odpovědi."
- "Prostor pro znovuspojení se sebou."
- "Ne další program. Skutečný prostor."

### Mikrokopie pro formy

- Success: "Jste na seznamu. Ozveme se."
- Error: "Něco se pokazilo. Zkuste to znovu."
- Loading: "..." (žádný text, jen animace)

---

## KONTROLNÍ SEZNAM PRO AI

Před dokončením ověř:

- [ ] Stránka působí klidně, ne prázdně
- [ ] Text jde přečíst bez námahy
- [ ] Jediný CTA je jasný, ale ne agresivní
- [ ] Dark/Light mode fungují konzistentně
- [ ] CZ/EN mutace mají stejnou atmosféru
- [ ] Žádné marketingové fráze ("nejlepší", "unikátní", "revoluce")
- [ ] Žádné urgency taktiky
- [ ] Symboly jsou čisté a srozumitelné
- [ ] Animace jsou jemné a neobtěžují
- [ ] Mobile verze je plně funkční
- [ ] Formulář funguje a dává zpětnou vazbu

---

## REFERENCE NÁLADY

Inspirace (ne kopie):

- Apple product pages — prostor, ticho, důraz
- Aesop — zemitost, autenticita, materialita
- Headspace — klid, přístupnost, bezpečí
- The School of Life — hloubka bez akademičnosti

---

*Verze dokumentu: v3.0 (AI Design Brief)*
*Aktualizováno: 2025*
