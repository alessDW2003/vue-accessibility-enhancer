<template>
  <h2>Tabs met v-accessible-tabs directive</h2>
  <div v-accessible-tabs role="tablist">
    <button role="tab" id="tab1" aria-controls="panel1">Tab 1</button>
    <button role="tab" id="tab2" aria-controls="panel2">Tab 2</button>
    <button role="tab" id="tab3" aria-controls="panel3">Tab 3</button>
  </div>
  <div role="tabpanel" id="panel1" aria-labelledby="tab1" tabindex="0">
    Content voor Tab 1
  </div>
  <div role="tabpanel" id="panel2" aria-labelledby="tab2" tabindex="0" hidden>
    Content voor Tab 2
  </div>
  <div role="tabpanel" id="panel3" aria-labelledby="tab3" tabindex="0" hidden>
    Content voor Tab 3
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
  padding: 0.5em 1em;
  margin-right: 0.25em;
  border: 1px solid #ccc;
  background: white;
}
button {
  background: #007acc;
  color: white;
  border-bottom: 2px solid #005fa3;
}
</style>
