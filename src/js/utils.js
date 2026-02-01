/**
 * Utilities
 * Helper functions for reduced motion detection, etc.
 */

const Utils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Check if browser supports IntersectionObserver
   */
  supportsIntersectionObserver() {
    return 'IntersectionObserver' in window;
  },

  /**
   * Debounce function for performance
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Get browser language preference
   * Returns 'cz' or 'en'
   */
  getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.toLowerCase().startsWith('cs') ? 'cz' : 'en';
  }
};

// Make available globally
window.Utils = Utils;
