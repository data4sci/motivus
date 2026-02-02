/**
 * i18n Manager
 * Handles Czech/English language switching
 */

class I18nManager {
  constructor() {
    this.currentLang = 'cz';
    this.content = {};
    this.storageKey = 'motivus-lang';
    this.langButtons = document.querySelectorAll('.lang-btn');
    this.init();
  }

  async init() {
    try {
      // Load content
      const response = await fetch('./data/content.json');
      if (!response.ok) {
        throw new Error(`Failed to load content.json: ${response.status}`);
      }
      this.content = await response.json();

      // Load saved or browser preference
      const saved = Utils.safeStorageGet(this.storageKey);
      const browserLang = Utils.getBrowserLanguage();
      this.currentLang = saved || browserLang;

      // Apply translations
      this.apply();

      // Setup language toggle listeners
      this.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute('data-lang');
          this.setLanguage(lang);
        });
      });
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Fallback to default (CZ) if loading fails
      this.currentLang = 'cz';
      this.apply();
    }
  }

  setLanguage(lang) {
    if (lang !== this.currentLang && (lang === 'cz' || lang === 'en')) {
      this.currentLang = lang;
      Utils.safeStorageSet(this.storageKey, lang);
      this.apply();
    }
  }

  apply() {
    // Update all text elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (this.content[this.currentLang] && this.content[this.currentLang][key]) {
        el.textContent = this.content[this.currentLang][key];
      }
    });

    // Update all placeholder attributes
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      if (this.content[this.currentLang] && this.content[this.currentLang][key]) {
        input.placeholder = this.content[this.currentLang][key];
      }
    });

    // Update aria-label attributes
    const ariaLabelEls = document.querySelectorAll('[data-i18n-aria-label]');
    ariaLabelEls.forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (this.content[this.currentLang] && this.content[this.currentLang][key]) {
        el.setAttribute('aria-label', this.content[this.currentLang][key]);
      }
    });

    // Update document lang attribute
    document.documentElement.lang = this.currentLang === 'cz' ? 'cs' : 'en';

    // Update page title
    if (this.content[this.currentLang] && this.content[this.currentLang].pageTitle) {
      document.title = this.content[this.currentLang].pageTitle;
    }

    // Update toggle UI
    this.updateToggle();

    // Dispatch event for other modules (e.g., countdown)
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang: this.currentLang }
    }));
  }

  updateToggle() {
    this.langButtons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      const isActive = lang === this.currentLang;

      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });
  }

  // Get current translation
  t(key) {
    return this.content[this.currentLang]?.[key] || key;
  }
}

// Initialize and make available globally
let i18nManager;
window.addEventListener('DOMContentLoaded', () => {
  i18nManager = new I18nManager();
  window.i18n = i18nManager;
});
