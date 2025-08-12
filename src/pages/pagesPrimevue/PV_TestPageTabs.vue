<template>
  <div>
    <h2>PrimeVue TabView voorbeeld</h2>

    <TabView>
      <TabPanel header="Tab 1"> Content voor Tab 1 </TabPanel>
      <TabPanel header="Tab 2"> Content voor Tab 2 </TabPanel>
      <TabPanel header="Tab 3"> Content voor Tab 3 </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
</script>
