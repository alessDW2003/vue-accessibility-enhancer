<template>
  <div class="accordion" v-accessible-accordian>
    <div class="accordion-item">
      <h3>
        <button>Accordion Item 1</button>
      </h3>
      <div data-accordion-panel>Content van accordion item 1.</div>
    </div>

    <div class="accordion-item">
      <h3>
        <button>Accordion Item 2</button>
      </h3>
      <div data-accordion-panel>Content van accordion item 2.</div>
    </div>

    <div class="accordion-item">
      <h3>
        <button>Accordion Item 3</button>
      </h3>
      <div data-accordion-panel>Content van accordion item 3.</div>
    </div>
  </div>
</template>

<style>
.accordion button {
  width: 100%;
  text-align: left;
  padding: 1em;
  font-size: 1.1em;
  cursor: pointer;
}

.accordion div {
  padding: 1em;
  border: 1px solid #ddd;
  margin-bottom: 1em;
}
</style>
