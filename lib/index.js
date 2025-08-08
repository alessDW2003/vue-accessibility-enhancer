import AccessibleDirective from './directives/accessible';
import AccessibleModalDirective from './directives/accessibleModal';
import ZccessibleDropDown from './directives/accessibleDropDown';
import './styles.css';
import accessibleDropDown from './directives/accessibleDropDown';
export default {
  install(app) {
    app.directive('accessible', AccessibleDirective);
    app.directive('accessible-modal', AccessibleModalDirective);
    app.directive('accessible-drop-down',accessibleDropDown);
  }
};
