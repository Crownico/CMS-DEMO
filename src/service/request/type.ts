import { AxiosRequestConfig } from "axios/index";
import { AxiosResponse } from "axios/index";

// 定义拦截器选项的类型，拦截器函数不一定全要用上，所以设计成可选的
export interface DdRequsetInterceptors<T = AxiosResponse> {
  // 请求的拦截函数，拦截器正常和拦截器失败
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // 响应的拦截函数，拦截器正常和拦截器失败
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

// 自定义的配置对象类型
// 直接使用的类型是我们自定义的类型，所以需要把泛型传递到这，从而可以再往上传到真正需要泛型的接口 DdRequsetInterceptors
export interface DdRequsetConifg<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展的拦截器选项，并且拦截器是可选的
  interceptors?: DdRequsetInterceptors<T>;
  showLoading?: boolean; // 通过配置控制请求是否需要 loading 效果
}
