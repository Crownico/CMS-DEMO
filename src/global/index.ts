import { App } from "vue";
import registerComponent from "./register-element"; // 导入 registerComponent 函数

export function registerApp(app: App): void {
  registerComponent(app); // 注册 element-plus 组件
  /*
   *这里以后还可以扩展注册其他的全局内容
   */
}
