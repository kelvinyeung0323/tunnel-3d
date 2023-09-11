import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "@/router/router.js";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";


const pinia = createPinia();
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.mount("#app");
