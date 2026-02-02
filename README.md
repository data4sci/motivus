# MOTIVUS — Teaser Landing Page

> Motivus nevolá. Motivus čeká.

Minimalistická teaser landing page pro MOTIVUS z.s. — místo pro lidi, kteří hledají skutečný směr.

## About

MOTIVUS je prostor pro podporu holistické harmonie člověka prostřednictvím emoční práce, komunitního budování a péče o mentální a vztahové zdraví.

Tato stránka je tichým přivítáním — první kontakt s projektem, který nespěchá, nemanipuluje a respektuje jedinečnost každého návštěvníka.

## Features

- **Animated canvas background**: Physics-based graph visualization with spring forces, Brownian motion, and mouse interaction
- **Minimalistický design**: Čistý, klidný vizuál s důrazem na prostor a ticho
- **Dark/Light mode**: Plynulé přepínání s podporou system preference
- **Bilingual**: Česká a anglická mutace (CZ/EN)
- **Countdown timer**: Dynamický odpočet k launch datu (bez urgency)
- **Email waitlist**: Jednoduchý formulář pro early access
- **Accessible**: WCAG 2.1 AA compliant, keyboard navigation, screen reader friendly
- **Performant**: < 200KB, FCP < 1s, Lighthouse score > 95
- **Zero dependencies**: Vanilla HTML/CSS/JS, žádný build proces

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, container queries, mobile-first
- **Vanilla JavaScript**: ES6+, modular architecture
- **Fonts**: Inter (Google Fonts)
- **Forms**: Formspree
- **Deployment**: GitHub Pages + GitHub Actions

## Project Structure

```plaintext
src/
├── index.html              # Main page
├── css/
│   ├── reset.css           # Modern CSS reset
│   ├── tokens.css          # Design tokens
│   ├── base.css            # Base styles
│   ├── layout.css          # Layout & responsive
│   ├── components.css      # Components
│   └── animations.css      # Animations
├── js/
│   ├── main.js             # App initialization
│   ├── theme.js            # Dark/light mode
│   ├── i18n.js             # Language switching
│   ├── canvas-background.js # Animated graph background
│   ├── animations.js       # Scroll & breathing animations
│   ├── countdown.js        # Launch countdown timer
│   ├── form.js             # Email form handling
│   └── utils.js            # Utilities
├── data/
│   └── content.json        # i18n content (CZ/EN)
└── assets/
    └── icons/              # SVG icons (inline)
```

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/motivus.git
cd motivus
```

1. Serve the `src/` directory with a local server:

```bash
# Using Python
python3 -m http.server 8000 --directory src

# Using Node.js
npx serve src

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

1. Open browser at `http://localhost:8000`

## Configuration

- **Waitlist form**: replace `YOUR_FORM_ID` in `src/index.html` with your Formspree form id.
- **Favicon**: `src/assets/favicon.png` and `src/assets/apple-touch-icon.png` are generated from `media/logo.png`.

## Deployment

The site is automatically deployed to GitHub Pages when pushing to the `main` branch via GitHub Actions.

**Live site**: `https://YOUR_USERNAME.github.io/motivus/`

### Custom Domain Setup (Optional)

1. Add `CNAME` file to `src/` with your domain (e.g., `motivus.cz`)
2. Configure DNS A records to point to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. Enable HTTPS in GitHub Pages settings

## Performance

- **First Contentful Paint**: < 1s
- **Total Page Weight**: < 200KB
- **Lighthouse Score**: > 95 (Performance, Accessibility, Best Practices, SEO)

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Reduced motion preference respected
- Color contrast ratios ≥ 4.5:1

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Documentation

- [Teaser PRD](specs/teaser_PRD.md) - Complete design brief
- [Vizuální manuál](specs/vizualni_manual.md) - Visual design guidelines
- [Manifest](specs/manifest.md) - Project mission statement
- [Hodnoty](specs/hodnoty.md) - Core values
- [Stanovy](specs/stanovy.md) - Organizational bylaws

## Philosophy

This page embodies the core values of MOTIVUS:

- **Respekt k jedinečnosti**: No aggressive CTAs, no manipulation
- **Autenticita**: Simple, honest code and design
- **Bezpečí a důvěra**: Privacy-friendly, accessible to all
- **Klid**: Calm animations, spacious layout, no urgency tactics

## License

© 2026 MOTIVUS z.s. All rights reserved.

## Contact

- Website: [motivus.cz](https://motivus.cz) (coming soon)
- Instagram: [@motivus.cz](https://instagram.com/motivus.cz)
- Facebook: [MOTIVUS](https://facebook.com/motivus.cz)

---

*Než uděláte další krok.*
