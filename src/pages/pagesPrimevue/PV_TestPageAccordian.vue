<template>
  <div>
    <h2>PrimeVue Accordion voorbeeld</h2>

    <Accordion>
      <AccordionTab header="Sectie 1"> Inhoud van sectie 1 </AccordionTab>
      <AccordionTab header="Sectie 2"> Inhoud van sectie 2 </AccordionTab>
      <AccordionTab header="Sectie 3"> Inhoud van sectie 3 </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
</script>
