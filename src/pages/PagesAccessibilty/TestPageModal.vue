<script setup>
import { ref } from "vue";

const isModalOpen = ref(false);
</script>

<template>
  <div>
    <h1>Accessibility Test - Modal Component</h1>

    <button
      @click="isModalOpen = true"
      aria-haspopup="dialog"
      :aria-expanded="isModalOpen.toString()"
      aria-controls="modal1"
    >
      Open Modal
    </button>

    <div
      v-if="isModalOpen"
      id="modal1"
      v-accessible-modal
      @modal-close="isModalOpen = false"
      tabindex="-1"
      class="modal"
    >
      <h2 id="modalTitle">Modal Titel</h2>
      <p>Dit is de inhoud van de modal.</p>
      <button @click="isModalOpen = false">Sluiten</button>
      <button @click="isModalOpen = false">Sluiten</button>
      <button @click="isModalOpen = false">Sluiten</button>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid black;
  padding: 1rem;
  z-index: 1000;
}
</style>
