import accessibleDirective from '../lib/directives/Accessible';
import accessibleModal from '../lib/directives/AccessibleModal';
import accessibleDropDown from '../lib/directives/AccessibleDropDown';
import accessibleAccordian from '../lib/directives/AccessibleAccordian';
import accessibleTabs from '../lib/directives/AccessibleTabs';

export default {
  install(app) {
    app.directive('accessible', accessibleDirective);
    app.directive('accessible-modal', accessibleModal);
    app.directive('accessible-dropdown', accessibleDropDown);
    app.directive('accessible-accordian', accessibleAccordian);
    app.directive('accessible-tabs', accessibleTabs);
    


  }
};

