import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-plus/dist/index.css"; // 全局引入样式
// import { registerApp } from "./global";

import { setupStore } from "@/store";
const app = createApp(App);

// 手动将数据从内存中载入vuex
setupStore();
// registerComponent(app);
// registerApp(app);

app.use(store).use(router).mount("#app");
