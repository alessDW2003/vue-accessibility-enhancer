export default {
  mounted(el) {
    const tablist = el.querySelector('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(el.querySelectorAll('[role="tab"]'));
    const panels = Array.from(el.querySelectorAll('[role="tabpanel"]'));

    // Set all tabs and panels to initial state
    tabs.forEach((tab, i) => {
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      panels[i].hidden = i !== 0;
    });

    const activateTab = (tab) => {
      tabs.forEach((t, i) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.setAttribute('tabindex', selected ? '0' : '-1');
        panels[i].hidden = !selected;
      });
      tab.focus();
    };

    const keyHandler = (e) => {
      const currentIndex = tabs.indexOf(document.activeElement);
      let newIndex = null;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabs.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          activateTab(document.activeElement);
          return;
        default:
          return; // other keys ignored
      }

      e.preventDefault();
      tabs[newIndex].focus();
    };

    tabs.forEach((tab) => {
      tab.addEventListener('keydown', keyHandler);
      tab.addEventListener('click', () => activateTab(tab));
    });

    el.__tabsKeyHandler = keyHandler;
  },

  unmounted(el) {
    const tabs = Array.from(el.querySelectorAll('[role="tab"]'));
    tabs.forEach((tab) => {
      tab.removeEventListener('keydown', el.__tabsKeyHandler);
      tab.removeEventListener('click', () => activateTab(tab));
    });
  }
};
