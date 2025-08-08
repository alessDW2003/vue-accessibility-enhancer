<template>
  <div class="button-container">
    <div v-accessible="isPressed" @toggle="isPressed = $event.detail">
      Toggle knop (druk hier of toets Enter/Space)
    </div>

    <div v-accessible @click="showAlert('Gewone knop geklikt!')">
      Gewone knop (druk hier of toets Enter/Space)
    </div>

    <div v-accessible @click="showAlert('Nog een knop!')">
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
