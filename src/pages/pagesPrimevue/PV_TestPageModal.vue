<template>
  <div>
    <h2>PrimeVue Dialog voorbeeld</h2>

    <Button
      label="Open Modal"
      icon="pi pi-external-link"
      @click="showDialog = true"
    />

    <Dialog
      v-model:visible="showDialog"
      modal
      header="Modal titel"
      :closable="true"
      :dismissableMask="true"
    >
      <p>Dit is de inhoud van de modal.</p>
      <Button label="Sluiten" icon="pi pi-times" @click="showDialog = false" />
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const showDialog = ref(false);
</script>
