import Ddrequest from "./request/request";
// 导入根据运行环境自动切换的环境变量
import { BASE_URL } from "./request/config";

const ddrequest = new Ddrequest({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor(config) {
      console.log("实例请求拦截成功");

      // 从 vuex 中或者本地缓存中获取到 token
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        // 将 token 设置到请求头中，也可能会设置在 post 的 data 里携带过去
        config.headers.Authorization = `${token}`;
      }

      return config;
    },
    responseInterceptor(res) {
      console.log("响应拦截成功");
      return res.data; // 直接返回服务器响应的有效数据
    }
  }
});
// const ddrequest2 = new Ddrequest();

// 对外导出多个请求实例
export default ddrequest;
