import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Setup Vue App and the add-ons
const app = createApp(App);
app.use(store);

app.mount('#app');
