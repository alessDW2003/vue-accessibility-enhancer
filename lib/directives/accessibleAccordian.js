export default {
  mounted(el) {
    const items = Array.from(el.querySelectorAll('.accordion-item'));
    items.forEach((item, i) => {
      const button = item.querySelector('button');
      const panel = item.querySelector('[role="region"]');

      // Zet ARIA-attributen en initiele staat
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', panel.id);
      panel.hidden = true;

      // Klik togglet open/dicht
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        panel.hidden = expanded;
      });

      // Keyboard navigatie: pijltjes naar vorige/volgende button
      button.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          newIndex = (i + 1) % items.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          newIndex = (i - 1 + items.length) % items.length;
        }
        if (newIndex !== null) {
          e.preventDefault();
          items[newIndex].querySelector('button').focus();
        }
      });
    });
  },
  unmounted(el) {
    // Cleanup event listeners als je wil (zelfde als mounted maar dan removeEventListener)
  }
};
