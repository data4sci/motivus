/**
 * Theme Manager
 * Handles dark/light mode toggle and persistence
 */

class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggle = document.getElementById('theme-toggle');
    this.storageKey = 'motivus-theme';
    this.mql = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init() {
    // Check localStorage, then system preference
    const saved = Utils.safeStorageGet(this.storageKey);
    const prefersDark = this.mql.matches;

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
    Utils.onMediaQueryChange(this.mql, (e) => {
      if (!Utils.safeStorageGet(this.storageKey)) {
        e.matches ? this.setDark(false) : this.setLight(false);
      }
    });

    // Update labels when language changes
    document.addEventListener('languageChanged', () => this.updateAriaLabel());
  }

  toggleTheme() {
    const isDark = this.root.classList.contains('dark-mode');
    isDark ? this.setLight(true) : this.setDark(true);
  }

  setDark(save = true) {
    this.root.classList.add('dark-mode');
    if (save) {
      Utils.safeStorageSet(this.storageKey, 'dark');
    }
    this.updateAriaLabel();
  }

  setLight(save = true) {
    this.root.classList.remove('dark-mode');
    if (save) {
      Utils.safeStorageSet(this.storageKey, 'light');
    }
    this.updateAriaLabel();
  }

  updateAriaLabel() {
    if (this.toggle) {
      const isDark = this.root.classList.contains('dark-mode');
      const key = isDark ? 'switchToLight' : 'switchToDark';
      const fallback = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      const label = window.i18n?.t(key) || fallback;
      this.toggle.setAttribute('aria-label', label);
      this.toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
  }
}

// Initialize and make available globally
window.themeManager = new ThemeManager();
