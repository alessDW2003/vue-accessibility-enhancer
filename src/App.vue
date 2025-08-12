<template>
  <TestPageTabs />
</template>

<script setup>
//primevue
import PV_TestAccessibility from "./pages/pagesPrimevue/PV_TestAccessibility.vue";
import PV_TestPageTabs from "./pages/pagesPrimevue/PV_TestPageTabs.vue";
import PV_TestPageAccordian from "./pages/pagesPrimevue/PV_TestPageAccordian.vue";
import PV_TestPageModal from "./pages/pagesPrimevue/PV_TestPageModal.vue";
import PV_TestPageDropDown from "./pages/pagesPrimevue/PV_TestPageDropDown.vue";

//geen accessibility
// import TestAccessibilityN from "./pages/PagesNoAccessibility/TestAccessibilityN.vue";
// import TestPageAccordianN from "./pages/PagesNoAccessibility/TestPageAccordianN.vue";
// import TestPageModalN from "./pages/PagesNoAccessibility/TestPageModalN.vue";
// import TestPageDropDownN from "./pages/PagesNoAccessibility/TestPageDropdownN.vue";
// import TestPageTabsN from "./pages/PagesNoAccessibility/TestPageTabsN.vue";

//eigen componenten
import TestAccessibility from "./pages/PagesAccessibilty/TestAccessibility.vue";
import TestPageAccordian from "./pages/PagesAccessibilty/TestPageAccordian.vue";
import TestPageModal from "./pages/PagesAccessibilty/TestPageModal.vue";
import TestPageTabs from "./pages/PagesAccessibilty/TestPageTabs.vue";
import TestPageDropdown from "./pages/PagesAccessibilty/TestPageDropdown.vue";
</script>
