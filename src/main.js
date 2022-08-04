import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import money from 'v-money'

import "./assets/main.css";

const app = createApp(App);

app.use(router);
// Vue.use(money, {precision: 2})
// app.component('toggle', Toggle);

app.mount("#app");
