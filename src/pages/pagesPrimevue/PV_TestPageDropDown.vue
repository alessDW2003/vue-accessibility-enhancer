<template>
  <div>
    <h2>PrimeVue Dropdown voorbeeld</h2>

    <Dropdown
      :options="options"
      v-model="selectedOption"
      optionLabel="name"
      placeholder="Selecteer een optie"
    />
    <p>Gekozen: {{ selectedOption ? selectedOption.name : "Geen" }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";

const options = [
  { name: "Optie 1", code: "1" },
  { name: "Optie 2", code: "2" },
  { name: "Optie 3", code: "3" },
];

const selectedOption = ref(null);
</script>
