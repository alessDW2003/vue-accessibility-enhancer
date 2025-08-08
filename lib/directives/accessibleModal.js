export default {
  mounted(el) {
    // Set ARIA attributes voor modal dialog
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');

    // Voeg een aria-label toe indien er geen label of labelledby is
    if (!el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', 'Modal dialog');
    }

    // Zorg dat de modal zichtbaar is
    el.style.display = 'block';

    // Selectors voor alle focusbare elementen
    const focusableSelectors = [
      'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])',
      'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed',
      '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
    ];

    const focusableEls = Array.from(el.querySelectorAll(focusableSelectors.join(',')));
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    // Bewaar het element dat focus had vóór het openen van de modal
    const previouslyFocusedElement = document.activeElement;

    // Focus op eerste focusbaar element
    if (firstFocusable) firstFocusable.focus();

    // Focus trap functie
    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab (achteruit)
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          // Tab (vooruit)
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        el.style.display = 'none';
        el.dispatchEvent(new CustomEvent('modal-close'));
      }
    };

    // Pijltjesnavigatie tussen focusbare elementen
    const arrowNavigate = (e) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;

      const currentIndex = focusableEls.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      e.preventDefault();

      let nextIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % focusableEls.length;
      } else {
        nextIndex = (currentIndex - 1 + focusableEls.length) % focusableEls.length;
      }

      focusableEls[nextIndex].focus();
    };

    // Event listeners voor keyboard handling
    el.addEventListener('keydown', trapFocus);
    el.addEventListener('keydown', arrowNavigate);

    // Focus terugzetten naar element dat focus had vóór openen modal
    el.addEventListener('modal-close', () => {
      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
      }
    });

    // Event handlers opslaan voor cleanup
    el.__trapFocus = trapFocus;
    el.__arrowNavigate = arrowNavigate;
  },

  unmounted(el) {
    el.removeEventListener('keydown', el.__trapFocus);
    el.removeEventListener('keydown', el.__arrowNavigate);
  }
};

