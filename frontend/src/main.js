import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import './assets/tailwind.css';

const app = createApp(App);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(ToastService);
app.component('Toast', Toast);
app.use(router).mount('#app');
