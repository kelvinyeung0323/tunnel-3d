import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "@/router/routes.js";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
