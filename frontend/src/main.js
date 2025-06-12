import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuthStore } from './stores/auth';
import './assets/main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Initialize Pinia and check auth state
const pinia = createPinia();
const authStore = useAuthStore(pinia);
authStore.checkAuth().then(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  app.mount('#app');
});