import {createApp} from "vue"
import App from "./App.vue"
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"

import {createVuetify} from "vuetify";
import router from "@/router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App)
const vuetify = createVuetify({});
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(vuetify)
app.use(router)
app.mount("#app")

