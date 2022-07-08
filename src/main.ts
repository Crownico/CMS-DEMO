import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-plus/dist/index.css"; // 全局引入样式
// import { registerApp } from "./global";

import { setupStore } from "@/store";
const app = createApp(App);
// import "@/mock/index.mjs";
// 手动将数据从内存中载入vuex
setupStore();
// registerComponent(app);
registerApp(app);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { registerApp } from "./global";

// 国际化
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

app.use(ElementPlus, {
  locale: zhCn
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // if (key !== "Menu") {
  //   app.component(key, component);
  // } else {
  //   app.component(key + "element", component);
  // }
  // 查看图标组件的名称
  // console.log(key);

  app.component(key, component);
}
app.use(store).use(router).mount("#app");
