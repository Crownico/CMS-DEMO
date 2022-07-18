/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare let $store: any; // 声明 $store 类型
declare module "*.json"; // 声明 json 文件模块
