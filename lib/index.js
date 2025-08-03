import AccessibleDirective from './directives/accessible';
export default {
  install(app) {
    app.directive('accessible', AccessibleDirective);
  }
};
