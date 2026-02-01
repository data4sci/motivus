/**
 * Countdown Manager
 * Handles countdown to launch date (1.4.2026)
 * Displays in minimalist, non-urgent style
 */

class CountdownManager {
  constructor() {
    this.element = document.getElementById('countdown');
    if (!this.element) return;

    // Target date: April 1st, 2026 at 00:00:00
    this.targetDate = new Date('2026-04-01T00:00:00').getTime();
    this.updateInterval = null;

    this.init();
  }

  init() {
    // Initial update
    this.update();

    // Update every minute (60000ms)
    this.updateInterval = setInterval(() => this.update(), 60000);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
    });
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    // Get current language
    const lang = window.i18n?.currentLang || 'cz';

    // Check if past the date
    if (distance < 0) {
      this.element.textContent = this.getText('launched', lang);
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
      return;
    }

    // Calculate time units
    const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Build countdown parts array
    const parts = [];

    if (weeks > 0) {
      parts.push(this.formatUnit(weeks, 'week', lang));
    }
    if (days > 0 || weeks > 0) {
      parts.push(this.formatUnit(days, 'day', lang));
    }
    if (hours > 0 || days > 0 || weeks > 0) {
      parts.push(this.formatUnit(hours, 'hour', lang));
    }
    parts.push(this.formatUnit(minutes, 'minute', lang));

    // Join parts with comma or appropriate separator
    const separator = lang === 'en' ? ', ' : ', ';
    this.element.textContent = parts.join(separator);
  }

  getText(key, lang) {
    const texts = {
      cz: {
        launched: 'Právě teď'
      },
      en: {
        launched: 'Right now'
      }
    };

    return texts[lang]?.[key] || texts.cz[key];
  }

  formatUnit(value, unit, lang) {
    if (lang === 'en') {
      const units = {
        week: value === 1 ? 'week' : 'weeks',
        day: value === 1 ? 'day' : 'days',
        hour: value === 1 ? 'hour' : 'hours',
        minute: value === 1 ? 'minute' : 'minutes'
      };
      return `${value} ${units[unit]}`;
    } else {
      // Czech pluralization
      const czechUnits = {
        week: this.czechPlural(value, 'týden', 'týdny', 'týdnů'),
        day: this.czechPlural(value, 'den', 'dny', 'dní'),
        hour: this.czechPlural(value, 'hodina', 'hodiny', 'hodin'),
        minute: this.czechPlural(value, 'minuta', 'minuty', 'minut')
      };
      return `${value} ${czechUnits[unit]}`;
    }
  }

  czechPlural(count, one, few, many) {
    if (count === 1) return one;
    if (count >= 2 && count <= 4) return few;
    return many;
  }

  // Method to manually trigger update (e.g., when language changes)
  refresh() {
    this.update();
  }
}

// Initialize and make available globally
window.addEventListener('DOMContentLoaded', () => {
  window.countdownManager = new CountdownManager();
});

// Listen for language changes to update countdown text
document.addEventListener('languageChanged', () => {
  if (window.countdownManager) {
    window.countdownManager.refresh();
  }
});
