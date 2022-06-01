import { ElButton } from "element-plus";
import { App } from "vue";

const components = [ElButton];

// 导出注册函数，在 main.ts 中只要执行该函数即可完成注册
export default function registerComponent(app: App) {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
