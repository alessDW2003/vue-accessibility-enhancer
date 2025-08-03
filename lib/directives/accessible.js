export default {
  mounted(el, binding) {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'button');
    }
    const clickHandler = () => el.click();
    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    };
    el.addEventListener('keydown', keyHandler);
    el.__keyHandler = keyHandler;
  },
  unmounted(el) {
    el.removeEventListener('keydown', el.__keyHandler);
  }
};
