import {createApp} from "vue"
import App from "./App.vue"
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"

import {createVuetify} from "vuetify";
import router from "@/router";

const app = createApp(App)
const vuetify = createVuetify({});
app.use(vuetify)
app.use(router)
app.mount("#app")
