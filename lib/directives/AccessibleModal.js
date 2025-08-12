export default {
  mounted(el) {
    // Rol en modal attributen
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');

    if (!el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', 'Modal dialog');
    }

    el.style.display = 'block';

    // Focusbare elementen
    const focusableSelectors = [
      'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])',
      'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed',
      '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
    ];
    let focusableEls = Array.from(el.querySelectorAll(focusableSelectors.join(',')));
    let firstFocusable = focusableEls[0];
    let lastFocusable = focusableEls[focusableEls.length - 1];

    // Opslaan van het element dat focus had voor openen
    el.__previouslyFocusedElement = document.activeElement;

    // Focus op eerste element
    if (firstFocusable) firstFocusable.focus();

    // Trap focus
    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        el.dispatchEvent(new CustomEvent('modal-close'));
      }
    };

    // Pijltjes navigatie
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

    // Event listeners
    el.addEventListener('keydown', trapFocus);
    el.addEventListener('keydown', arrowNavigate);

    // Focus herstellen bij sluiten
    el.addEventListener('modal-close', () => {
      if (el.__previouslyFocusedElement && el.__previouslyFocusedElement.focus) {
        el.__previouslyFocusedElement.focus();
      }
    });

    // Opslaan voor cleanup
    el.__trapFocus = trapFocus;
    el.__arrowNavigate = arrowNavigate;
  },

  unmounted(el) {
    el.removeEventListener('keydown', el.__trapFocus);
    el.removeEventListener('keydown', el.__arrowNavigate);

    if (el.__previouslyFocusedElement && el.__previouslyFocusedElement.focus) {
      el.__previouslyFocusedElement.focus();
    }
  }
};
