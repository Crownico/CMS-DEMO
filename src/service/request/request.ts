import axios from "axios/index";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios/index";
import { ElLoading } from "element-plus";
// 因为是以服务的形式引入 loading，所以要手动引入类型和样式
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";

// import "element-plus/es/components/loading/style/index"; // 需要 sass-loader，太麻烦了还是全局引入样式吧

// 定义拦截器选项的类型，拦截器函数不一定全要用上，所以设计成可选的
interface DdRequsetInterceptors<T = AxiosResponse> {
  // 请求的拦截函数，拦截器正常和拦截器失败
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // 响应的拦截函数，拦截器正常和拦截器失败
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

// 设置 loading 默认开启
const DEFAULT_LOADING = true;

// 自定义的配置对象类型
// 直接使用的类型是我们自定义的类型，所以需要把泛型传递到这，从而可以再往上传到真正需要泛型的接口 DdRequsetInterceptors
interface DdRequsetConifg<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展的拦截器选项，并且拦截器是可选的
  interceptors?: DdRequsetInterceptors<T>;
  showLoading?: boolean; // 通过配置控制请求是否需要 loading 效果
}

class Ddrequest {
  instance: AxiosInstance;
  instanceInterceptor!: DdRequsetInterceptors;
  loadingInstance!: LoadingInstance; // 非空断言
  showLoading!: boolean; // 保存 showLoading 的结果，方便后续使用

  // 将类型更换成自己定义的类型
  constructor(config: DdRequsetConifg) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; // 空值合并，没有配置 showLoading 默认值为 DEFAULT_LOADING

    // 获取构造实例时传入的拦截器选项并保存在一个属性中，由于拦截器是可选的，所以可能是 undefined
    if (config.interceptors) {
      this.instanceInterceptor = config.interceptors;
      // 将获取到的拦截器函数在该实例中启用
      this.instance.interceptors.request.use(
        this.instanceInterceptor?.requestInterceptor,
        this.instanceInterceptor?.requestInterceptorCatch
      );
      this.instance.interceptors.response.use(
        this.instanceInterceptor?.responseInterceptor,
        this.instanceInterceptor?.responseInterceptorCatch
      );
    }

    // 添加全局拦截器
    this.instance.interceptors.request.use(
      // 为什么能直接使用 config 对象？因为我们定义的类型继承了原类型，作为它的子类，自然能通过类型检测
      (config) => {
        console.log("全局请求拦截成功");

        if (this.showLoading) {
          // 添加 loading
          this.loadingInstance = ElLoading.service({
            lock: true, // 遮罩
            text: "正在请求中...",
            background: "rgba(0,0,0,0.5)"
          });
        }

        return config;
      },
      (err) => console.log(err)
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应拦截成功");

        if (this.showLoading) {
          setTimeout(() => {
            // 取消 loading
            this.loadingInstance.close();
          }, 3000);
        }

        // 通知请求失败的方式：自定义状态，假设返回数据结构为：{success: false, returnCode: xxx}
        switch (res.data.returnCode) {
          case -1001: // 具体的错误代码需要和服务端对接
            console.log("请求失败");
            break;
          case 200:
            console.log("请求成功");
            return res.data; // 请求成功就预处理下请求内容
          default:
            break;
        }
        return res.data; // 处理一下返回结果，只返回请求数据
      },
      (err) => {
        console.log(err);

        // 通知请求失败方式：httpCode
        switch (err.response.status) {
          // case err.response.status >= 400 && err.response.status < 500:
          case 404:
            // 错误处理
            console.log(`${err.response.status}: 客户端请求错误`);
            break;
          // case err.response.status >= 500 && err.response.status < 600:
          case 500:
            // 错误处理
            console.log(`${err.response.status}: 服务器响应错误`);
            break;
          default:
            break;
        }
      }
    );
  }
  // 这里对 request() 封装，使其可以配置拦截器函数
  // request(config: DdRequsetConifg) {
  //   // 添加拦截器
  //   this.instance.interceptors.request.use(
  //     config.interceptors?.requestInterceptor,
  //     config.interceptors?.requestInterceptorCatch
  //   );
  //   this.instance.interceptors.response.use(
  //     config.interceptors?.responseInterceptor,
  //     config.interceptors?.responseInterceptorCatch
  //   );
  //   // 配置对象类型要换成我们自定义的，以或得配置拦截器的选项
  //   this.instance.request(config).then((res) => {
  //     console.log(res);
  //   });
  // }

  // 返回 promise 并设置 Promise 类型为泛型
  request<T>(config: DdRequsetConifg<T>): Promise<T> {
    // 返回一个 promise 让用户处理请求结果
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        // 在发起请求之前，手动执行请求拦截器中的成功处理函数
        // 执行这个函数和执行一个普通函数没两样，只是这个函数来自请求配置对象中
        config = config.interceptors.requestInterceptor(config);
      }

      // 根据请求配置，控制 loading 开关
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      // 发送请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 请求成功后，手动执行响应拦截器中的成功处理函数
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 请求完成后对 showLoading 进行复位，要不然下一个请求也没有 loading
          this.showLoading = DEFAULT_LOADING;

          // 获取请求结果后的一些普通处理
          // console.log(res);

          // 将由 axios.request 发起的真正请求请求回来的数据传递出去给 then
          // 注意：promise 类型为 T，所以这里 resolve(res) 中 res 类型必须为 T
          // axios.request() 发起真正的请求，请求回的数据在 res 中，但是 .then(res)  res 的类型为 AxiosResponse
          resolve(res);
        })
        .catch((err) => {
          // 请求完成后对 showLoading 进行复位，要不然下一个请求也没有 loading
          this.showLoading = DEFAULT_LOADING;

          // 将失败传递给用户处理
          reject(err);
          console.log(err);
        });
    });
  }
  get<T>(config: DdRequsetConifg<T>): Promise<T> {
    // 调用 request 方法，并手动指定请求类型
    return this.request({ ...config, method: "GET" });
  }
  post<T>(config: DdRequsetConifg<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T>(config: DdRequsetConifg<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T>(config: DdRequsetConifg<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
  head<T>(config: DdRequsetConifg<T>): Promise<T> {
    return this.request({ ...config, method: "HEAD" });
  }
}

export default Ddrequest;
