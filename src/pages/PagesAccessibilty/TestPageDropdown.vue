<template>
  <div class="dropdown">
    <button
      id="dropdownButton"
      :aria-expanded="isOpen.toString()"
      aria-haspopup="true"
      @click="toggleDropdown"
    >
      Kies een optie
    </button>

    <ul
      v-accessible-dropdown
      v-show="isOpen"
      role="menu"
      aria-labelledby="dropdownButton"
    >
      <li role="menuitem" tabindex="-1" @click="selectOption('Optie 1')">
        Optie 1
      </li>
      <li role="menuitem" tabindex="-1" @click="selectOption('Optie 2')">
        Optie 2
      </li>
      <li role="menuitem" tabindex="-1" @click="selectOption('Optie 3')">
        Optie 3
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  alert(`Je hebt ${option} gekozen`);
  isOpen.value = false;
}

// Sluit dropdown als er buiten wordt geklikt
function handleClickOutside(event) {
  if (!event.target.closest(".dropdown")) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown li:hover,
.dropdown li:focus {
  background-color: #eee;
}
</style>
