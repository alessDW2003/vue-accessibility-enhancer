import AccessibleDirective from './directives/accessible';
import AccessibleModalDirective from './directives/accessibleModal';
export default {
  install(app) {
    app.directive('accessible', AccessibleDirective);
    app.directive('accessible-modal', AccessibleModalDirective);
  }
};
