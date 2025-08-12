<template>
  <div>
    <h2>PrimeVue Button voorbeeld</h2>

    <Button
      label="PrimeVue knop"
      @click="showAlert('PrimeVue knop geklikt!')"
    />
    <Button
      label="PrimeVue knop"
      @click="showAlert('PrimeVue knop geklikt!')"
    />
    <Button
      label="PrimeVue knop"
      @click="showAlert('PrimeVue knop geklikt!')"
    />
  </div>
</template>

<script setup>
import { Button } from "primevue";
import { ref } from "vue";

function showAlert(msg) {
  alert(msg);
}
</script>
