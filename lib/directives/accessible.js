export default {
  mounted(el, binding) {
    // Voeg focusstijl toe via class (voor outline bij focus)
    el.classList.add('accessible');

    // Maak element focusbaar en geef standaard rol 'button'
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'button');
    }

    // Toggle state detecteren
    const isToggle = typeof binding.value === 'boolean';
    if (isToggle) {
      el.setAttribute('aria-pressed', binding.value);
    }

    // Disabled state helper
    const isDisabled = () =>
      el.getAttribute('aria-disabled') === 'true' || el.hasAttribute('disabled');

    // Click handler
    const clickHandler = () => {
      if (isDisabled()) return;

      if (isToggle) {
        const newState = el.getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
        el.setAttribute('aria-pressed', newState);
        el.dispatchEvent(new CustomEvent('toggle', { detail: newState === 'true' }));
      } else {
        el.click();
      }
    };

    // Keydown handler (Enter & Space)
    const keyHandler = (e) => {
      if (isDisabled()) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    };

    // Pijltjestoets navigatie binnen siblings
    const arrowKeyHandler = (e) => {
      const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
      if (!keys.includes(e.key)) return;

      const parent = el.parentNode;
      if (!parent) return;

      const focusableSelectors = [
        'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])',
        'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object',
        'embed', '[tabindex]:not([tabindex="-1"])', '[contenteditable]',
        'div[tabindex]:not([tabindex="-1"])'
      ];

      const focusableElements = Array.from(parent.querySelectorAll(focusableSelectors.join(',')))
        .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true');

      const currentIndex = focusableElements.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      e.preventDefault();

      let nextIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % focusableElements.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
      }

      focusableElements[nextIndex]?.focus();
    };

    // Events toevoegen
    el.addEventListener('click', clickHandler);
    el.addEventListener('keydown', keyHandler);
    el.addEventListener('keydown', arrowKeyHandler);

    // Opslaan voor cleanup
    el.__clickHandler = clickHandler;
    el.__keyHandler = keyHandler;
    el.__arrowKeyHandler = arrowKeyHandler;
  },

  updated(el, binding) {
    if (typeof binding.value === 'boolean') {
      el.setAttribute('aria-pressed', binding.value);
    }
  },

  unmounted(el) {
    el.removeEventListener('click', el.__clickHandler);
    el.removeEventListener('keydown', el.__keyHandler);
    el.removeEventListener('keydown', el.__arrowKeyHandler);

    delete el.__clickHandler;
    delete el.__keyHandler;
    delete el.__arrowKeyHandler;
  }
};
