import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Import the css file from the shared directory
import '../../shared/app.css';

// Import the application specific css file
import './assets/styles/main.css';

// Setup Vue App and the add-ons
const app = createApp(App);
app.use(store);

app.mount('#app');
