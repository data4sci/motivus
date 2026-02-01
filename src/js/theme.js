/**
 * Theme Manager
 * Handles dark/light mode toggle and persistence
 */

class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggle = document.getElementById('theme-toggle');
    this.storageKey = 'motivus-theme';
    this.init();
  }

  init() {
    // Check localStorage, then system preference
    const saved = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      this.setDark(false);
    } else {
      this.setLight(false);
    }

    // Setup toggle button listener
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          e.matches ? this.setDark(false) : this.setLight(false);
        }
      });
  }

  toggleTheme() {
    const isDark = this.root.classList.contains('dark-mode');
    isDark ? this.setLight(true) : this.setDark(true);
  }

  setDark(save = true) {
    this.root.classList.add('dark-mode');
    if (save) {
      localStorage.setItem(this.storageKey, 'dark');
    }
    this.updateAriaLabel('dark');
  }

  setLight(save = true) {
    this.root.classList.remove('dark-mode');
    if (save) {
      localStorage.setItem(this.storageKey, 'light');
    }
    this.updateAriaLabel('light');
  }

  updateAriaLabel(mode) {
    if (this.toggle) {
      const label = mode === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode';
      this.toggle.setAttribute('aria-label', label);
    }
  }
}

// Initialize and make available globally
window.themeManager = new ThemeManager();
