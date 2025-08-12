export default {
  mounted(el) {
    // Zet role="tablist" op container als het nog niet bestaat
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'tablist');
    }

    // Zoek tabs binnen de container
    const tabs = Array.from(el.querySelectorAll('[role="tab"]'));

    // Zoek de bijhorende tabpanels via aria-controls van elke tab
    const tabpanels = tabs.map(tab => {
      const panelId = tab.getAttribute('aria-controls');
      return panelId ? document.getElementById(panelId) : null;
    });

    // Initialiseer tabs en tabpanels
    tabs.forEach((tab, i) => {
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');

      // fallback: voeg aria-controls toe als ontbreekt, koppel aan paneel
      if (!tab.hasAttribute('aria-controls') && tabpanels[i]) {
        tab.setAttribute('aria-controls', tabpanels[i].id);
      }
    });

    tabpanels.forEach((panel, i) => {
      if (!panel) return;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabs[i].id || '');
      panel.tabIndex = 0;
      panel.hidden = i !== 0;
    });

    const activateTab = (index) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('tabindex', selected ? '0' : '-1');
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        if (tabpanels[i]) tabpanels[i].hidden = !selected;
        if (selected) tab.focus();
      });
    };

    const handleKeydown = (e) => {
      const currentIndex = tabs.indexOf(document.activeElement);
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          activateTab(currentIndex);
          return;
      }

      if (newIndex !== currentIndex) {
        tabs[newIndex].focus();
      }
    };

    const handleClick = (e) => {
      const index = tabs.indexOf(e.target);
      if (index !== -1) {
        activateTab(index);
      }
    };

    // Eventlisteners toevoegen aan de tablist container
    el.addEventListener('keydown', handleKeydown);
    el.addEventListener('click', handleClick);

    // Opslaan voor unmount
    el.__handleKeydown = handleKeydown;
    el.__handleClick = handleClick;
  },

  unmounted(el) {
    el.removeEventListener('keydown', el.__handleKeydown);
    el.removeEventListener('click', el.__handleClick);
  }
};
