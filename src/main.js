import { createApp } from 'vue';
import App from './App.vue';
import AccessibilityPlugin from '../lib/index.js';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(AccessibilityPlugin);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');
