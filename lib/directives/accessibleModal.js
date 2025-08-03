export default {
  mounted(el) {
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.style.display = 'block'; 

    const focusableSelectors = [
      'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])',
      'button:not([disabled])', 'iframe', 'object', 'embed', '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
    ];
    const focusableEls = el.querySelectorAll(focusableSelectors.join(','));
    let firstFocusable = focusableEls[0];
    let lastFocusable = focusableEls[focusableEls.length - 1];

    if (firstFocusable) firstFocusable.focus();
    const focusableButtons = Array.from(el.querySelectorAll('button:not([disabled])'));

const arrowNavigate = (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const currentIndex = focusableButtons.indexOf(document.activeElement);
    const nextIndex = (currentIndex + 1) % focusableButtons.length;
    focusableButtons[nextIndex].focus();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const currentIndex = focusableButtons.indexOf(document.activeElement);
    const prevIndex = (currentIndex - 1 + focusableButtons.length) % focusableButtons.length;
    focusableButtons[prevIndex].focus();
  }
};

el.addEventListener('keydown', arrowNavigate);
el.__arrowNavigate = arrowNavigate;


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
        el.style.display = 'none';
        el.dispatchEvent(new CustomEvent('modal-close'));
      }
    };

    el.addEventListener('keydown', trapFocus);
    el.__trapFocus = trapFocus;
  },
  unmounted(el) {
    el.removeEventListener('keydown', el.__trapFocus);
  }

  
};
