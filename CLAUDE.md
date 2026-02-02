# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MOTIVUS is a minimalist teaser landing page for a Czech non-profit focused on holistic personal development. Static HTML/CSS/JS site with zero external dependencies, bilingual (CZ/EN), dark/light mode, and animated canvas background with physics simulation.

## Development Commands

```bash
# Local development - serve static files
python3 -m http.server 8000 --directory src

# Validate i18n key consistency (checks data-i18n* attributes against content.json)
python3 scripts/validate_i18n.py
```

**Deployment**: Push to `main` branch triggers automatic GitHub Pages deployment via `.github/workflows/deploy.yml`.

## Architecture

### JavaScript Module System

All JS uses IIFE pattern with class-based managers exposed as globals:

- **`window.themeManager`** (`theme.js`) - Dark/light mode with localStorage persistence and system preference detection
- **`window.i18n`** (`i18n.js`) - Language switching, loads `/src/data/content.json`, dispatches `languageChanged` events
- **`window.canvasBackground`** (`canvas-background.js`) - Physics-based animated graph background with Brownian motion, spring forces, and mouse attraction
- **`window.animationsManager`** (`animations.js`) - Scroll-based fade-in using IntersectionObserver
- **`window.countdownManager`** (`countdown.js`) - Countdown to launch date with Czech pluralization
- **`window.formManager`** (`form.js`) - Email waitlist via Formspree

Modules communicate via custom DOM events (e.g., `languageChanged`) and shared `Utils` singleton.

### CSS Architecture

- Design tokens in `tokens.css` (CSS custom properties for theming)
- Theme switching via `dark-mode` class on document root
- Mobile-first responsive design with fluid typography using `clamp()`

### Key Files

- `/src/data/content.json` - i18n translations source of truth
- `/specs/teaser_PRD.md` - Design philosophy and requirements
- `/specs/vizualni_manual.md` - Visual design guidelines

## Constraints

- **No external JS libraries** - vanilla JavaScript only
- **No build process** - plain HTML/CSS/JS served directly
- **All user-facing text must be in `content.json`** - use `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` attributes
- **Performance targets**: < 200KB total, Lighthouse > 95
- **Accessibility**: WCAG 2.1 AA, respect `prefers-reduced-motion`

## Canvas Background Implementation

The animated background (`canvas-background.js`) uses:

- Verlet integration for node movement
- Spring forces with adaptive rest length
- Brownian motion for natural drift
- Mouse attraction with cubic falloff
- Responsive density: 4 graphs on mobile, 12 on desktop
- FPS monitoring with automatic quality degradation
