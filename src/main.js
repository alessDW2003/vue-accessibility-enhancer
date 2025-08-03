import { createApp } from 'vue';
import App from './App.vue';
import AccessibilityPlugin from '../lib/index.js';

const app = createApp(App);
app.use(AccessibilityPlugin);
app.mount('#app');
