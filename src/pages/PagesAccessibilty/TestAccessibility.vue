<template>
  <div class="button-container" v-accessible>
    <div
      class="accessible-button"
      tabindex="0"
      @toggle="isPressed = $event.detail"
    >
      Toggle knop (druk hier of toets Enter/Space)
    </div>

    <div
      class="accessible-button"
      tabindex="0"
      @click="showAlert('Gewone knop geklikt!')"
    >
      Gewone knop (druk hier of toets Enter/Space)
    </div>

    <div
      class="accessible-button"
      tabindex="0"
      @click="showAlert('Nog een knop!')"
    >
      Nog een knop (druk hier of toets Enter/Space)
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isPressed = ref(false);

function showAlert(message) {
  alert(message);
  console.log(message);
}
</script>

<style scoped>
.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.accessible-button {
  background-color: #1976d2; /* primaire kleur */
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  outline: none;
  border: none;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.accessible-button:hover {
  background-color: #1565c0;
}

.accessible-button:focus {
  outline: 3px solid #ffcc00; /* duidelijke focusring */
  outline-offset: 2px;
}

.accessible-button:active {
  background-color: #0d47a1;
  transform: scale(0.98);
}
</style>
