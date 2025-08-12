export default {
  mounted(el) {
    // ARIA-rol voor listbox
    el.setAttribute('role', 'listbox');
    el.setAttribute('tabindex', '-1');

    // Zoek de knop die de dropdown opent
    const trigger = el.previousElementSibling;
    if (trigger) {
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
    }

    // Selecteer opties en stel rollen in
    const optionEls = Array.from(el.querySelectorAll('li, [role="option"]'));
    optionEls.forEach((opt, index) => {
      opt.setAttribute('role', 'option');
      opt.setAttribute('tabindex', '-1');
      if (index === 0) opt.setAttribute('aria-selected', 'true');
      else opt.setAttribute('aria-selected', 'false');
    });

    let currentIndex = 0;

    const updateFocus = () => {
      optionEls.forEach((opt, i) => {
        opt.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      });
      optionEls[currentIndex].focus();
    };

    const openDropdown = () => {
      el.style.display = 'block';
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      currentIndex = 0;
      updateFocus();
    };

    const closeDropdown = () => {
      el.style.display = 'none';
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (trigger) trigger.focus();
    };

    const selectOption = () => {
      const selected = optionEls[currentIndex];
      if (selected) {
        selected.click(); // activeer de optie
        closeDropdown();
      }
    };

    const handleKeydown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          currentIndex = (currentIndex + 1) % optionEls.length;
          updateFocus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          currentIndex = (currentIndex - 1 + optionEls.length) % optionEls.length;
          updateFocus();
          break;
        case 'Home':
          e.preventDefault();
          currentIndex = 0;
          updateFocus();
          break;
        case 'End':
          e.preventDefault();
          currentIndex = optionEls.length - 1;
          updateFocus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          selectOption();
          break;
        case 'Escape':
          e.preventDefault();
          closeDropdown();
          break;
        case 'Tab':
          closeDropdown();
          break;
      }
    };

    const handleClickOutside = (e) => {
      if (!el.contains(e.target) && e.target !== trigger) {
        closeDropdown();
      }
    };

    const handleTriggerClick = (e) => {
      e.preventDefault();
      if (el.style.display === 'block') {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    if (trigger) trigger.addEventListener('click', handleTriggerClick);
    el.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleClickOutside);

    el.__handleKeydown = handleKeydown;
    el.__handleClickOutside = handleClickOutside;
    el.__handleTriggerClick = handleTriggerClick;
    el.__triggerEl = trigger;
  },

  unmounted(el) {
    el.removeEventListener('keydown', el.__handleKeydown);
    document.removeEventListener('mousedown', el.__handleClickOutside);
    if (el.__triggerEl) {
      el.__triggerEl.removeEventListener('click', el.__handleTriggerClick);
    }
  }
};
