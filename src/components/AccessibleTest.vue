<template>
  <div>
    <button v-accessible @click="handleClick">Klik of Enter/Spatie toets</button>
  </div>
</template>

<script setup>
function handleClick() {
  alert('Element geactiveerd!');
}
</script>