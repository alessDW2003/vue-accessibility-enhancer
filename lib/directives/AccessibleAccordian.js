// accessibleAccordion.js
export default {
  mounted(el) {
    const items = Array.from(el.querySelectorAll('.accordion-item'));

    items.forEach((item, i) => {
      const button = item.querySelector('button');
      const panel = item.querySelector('[data-accordion-panel]');

      if (!button.id) button.id = `accordion-header-${i + 1}`;
      if (!panel.id) panel.id = `accordion-panel-${i + 1}`;

      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', button.id);
      panel.hidden = true;

      const toggleAccordion = () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        panel.hidden = expanded;
      };

      button.addEventListener('click', toggleAccordion);

      button.addEventListener('keydown', (e) => {
        let newIndex = null;

        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            newIndex = (i + 1) % items.length;
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            newIndex = (i - 1 + items.length) % items.length;
            break;
          case 'Home':
            newIndex = 0;
            break;
          case 'End':
            newIndex = items.length - 1;
            break;
          case 'Enter':
          case ' ':
            e.preventDefault(); 
            toggleAccordion();
            return;
        }

        if (newIndex !== null) {
          e.preventDefault();
          items[newIndex].querySelector('button').focus();
        }
      });
    });
  },
  unmounted(el) {
   
  }
};
