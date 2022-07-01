import { formatUtcString } from "@/utils/date-format";
import { App } from "vue";

export default function registerPropertie(app: App) {
  // 定义全局对象 $filters
  app.config.globalProperties.$filters = {
    // 时间格式化函数
    formatTime: (time: string) => {
      return formatUtcString(time);
    }
  };
}
