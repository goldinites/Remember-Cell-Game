import './assets/main.scss'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from "@/helpers/i11n-messages.js";
import App from './App.vue';
import ClickOutside from "@/directives/clickOutside.js";

const i18n = createI18n({
    locale: 'en',
    legacy: false,
    messages
})

const app = createApp(App)

app.directive('click-outside', ClickOutside);
app.use(i18n)
app.mount('#app')
