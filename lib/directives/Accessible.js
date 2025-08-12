// accessibleDirective.js

export default {
  mounted(el) {
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'region');
    }

    const focusableSelectors = `
      a[href], area[href], input:not([disabled]), select:not([disabled]),
      textarea:not([disabled]), button:not([disabled]), iframe, object, embed,
      [tabindex]:not([tabindex="-1"]), [contenteditable]
    `;

    const getFocusableElements = () => {
      return Array.from(el.querySelectorAll(focusableSelectors))
        .filter(focusable => (focusable.offsetWidth > 0 || focusable.offsetHeight > 0 || focusable === document.activeElement));
    };

    const focusFirst = () => {
      const first = getFocusableElements()[0];
      if (first) first.focus();
    };

    const focusLast = () => {
      const focusables = getFocusableElements();
      const last = focusables[focusables.length - 1];
      if (last) last.focus();
    };

    const focusNext = () => {
      const focusables = getFocusableElements();
      const index = focusables.indexOf(document.activeElement);
      if (index >= 0 && index < focusables.length - 1) {
        focusables[index + 1].focus();
      } else {
        focusFirst();
      }
    };

    const focusPrevious = () => {
      const focusables = getFocusableElements();
      const index = focusables.indexOf(document.activeElement);
      if (index > 0) {
        focusables[index - 1].focus();
      } else {
        focusLast();
      }
    };

    const handleKey = (event) => {
      switch (event.key) {
        case 'Tab':
          {
            const focusables = getFocusableElements();
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey) {
              if (document.activeElement === first) {
                event.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          focusNext();
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          focusPrevious();
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (document.activeElement && typeof document.activeElement.click === 'function') {
            document.activeElement.click();
          }
          break;
      }
    };

    el.__handleKey = handleKey;

    el.addEventListener('keydown', el.__handleKey);

    focusFirst();
  },

  unmounted(el) {
    el.removeEventListener('keydown', el.__handleKey);
    delete el.__handleKey;
  }
};
