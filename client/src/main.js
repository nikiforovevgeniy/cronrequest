import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'tailwindcss/tailwind.css';
import '@/assets/icons/style.css';
import '@/assets/style/main.pcss';

import helpers from '@/helpers.js';
import moment from 'moment';

const app = createApp(App).use(router);

app.config.globalProperties.helpers = helpers;
app.config.globalProperties.moment = moment;

app.mount('#app');
