export default {
  mounted(el) {
    el.setAttribute('role', 'button');
    el.setAttribute('aria-haspopup', 'listbox');
    el.setAttribute('aria-expanded', 'false');
    el.setAttribute('tabindex', '0');

    // Veronderstel dat dropdown-menu een direct kind is met rol="listbox"
    const menu = el.querySelector('[role="listbox"]');
    if (!menu) {
      console.warn('Accessible dropdown: geen element met role="listbox" gevonden binnen dropdown');
      return;
    }
    menu.setAttribute('tabindex', '-1'); // menu zelf niet focusbaar, items wel

    const items = Array.from(menu.querySelectorAll('[role="option"]'));

    // Helper: menu openen/sluiten
    const openMenu = () => {
      el.setAttribute('aria-expanded', 'true');
      menu.style.display = 'block';
      items[0]?.focus();
    };

    const closeMenu = () => {
      el.setAttribute('aria-expanded', 'false');
      menu.style.display = 'none';
      el.focus();
    };

    // Toggle menu bij click of Enter/Space op button
    const toggleMenu = () => {
      if (el.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    };

    const onButtonKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          openMenu();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleMenu();
          break;
        case 'Escape':
          if (el.getAttribute('aria-expanded') === 'true') {
            e.preventDefault();
            closeMenu();
          }
          break;
      }
    };

    const onMenuKeyDown = (e) => {
      const currentIndex = items.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          items[(currentIndex + 1) % items.length].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          items[(currentIndex - 1 + items.length) % items.length].focus();
          break;
        case 'Home':
          e.preventDefault();
          items[0].focus();
          break;
        case 'End':
          e.preventDefault();
          items[items.length - 1].focus();
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          // Trigger selectie event
          const selectedValue = document.activeElement.getAttribute('data-value');
          el.dispatchEvent(new CustomEvent('select', { detail: selectedValue }));
          closeMenu();
          break;
      }
    };

    el.addEventListener('click', toggleMenu);
    el.addEventListener('keydown', onButtonKeyDown);
    menu.addEventListener('keydown', onMenuKeyDown);

    // Sluit menu als er buiten geklikt wordt
    const onDocumentClick = (e) => {
      if (!el.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('click', onDocumentClick);

    el.__toggleMenu = toggleMenu;
    el.__onButtonKeyDown = onButtonKeyDown;
    el.__onMenuKeyDown = onMenuKeyDown;
    el.__onDocumentClick = onDocumentClick;
    el.__closeMenu = closeMenu;
  },

  unmounted(el) {
    const menu = el.querySelector('[role="listbox"]');
    el.removeEventListener('click', el.__toggleMenu);
    el.removeEventListener('keydown', el.__onButtonKeyDown);
    if (menu) {
      menu.removeEventListener('keydown', el.__onMenuKeyDown);
    }
    document.removeEventListener('click', el.__onDocumentClick);
  }
};
