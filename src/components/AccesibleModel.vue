<script setup>
import { ref } from "vue";

const isOpen = ref(false);
function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}

function test() {
  alert("Test button clicked!");
}
</script>

<template>
  <div>
    <button @click="openModal">Open modal</button>

    <div
      v-if="isOpen"
      v-accessible-modal
      class="modal"
      @modal-close="closeModal"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal titel</h2>
      <p>Inhoud van de modal</p>
      <button @click="closeModal">Sluiten</button>
      <button @click="test">Test</button>
      <button @click="test">Test2</button>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  padding: 1rem;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
