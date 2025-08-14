import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VakaoUI from "vakao-ui";
import "vakao-ui/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VakaoUI);

app.mount("#app");
