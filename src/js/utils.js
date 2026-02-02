/**
 * Utilities
 * Helper functions for reduced motion detection, etc.
 */

const Utils = {
  /**
   * Safely read from localStorage (may throw in some environments)
   */
  safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  /**
   * Safely write to localStorage (may throw in some environments)
   */
  safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

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
   * Subscribe to MediaQueryList changes with broad browser support
   */
  onMediaQueryChange(mediaQueryList, handler) {
    if (!mediaQueryList) return;
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handler);
      return () => mediaQueryList.removeEventListener('change', handler);
    }
    if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(handler);
      return () => mediaQueryList.removeListener(handler);
    }
    return () => {};
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
