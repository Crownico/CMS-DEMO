import { ILoginState } from "./login/type";
import { ISystemModule } from "./main/system/type";

// 根模块 state 的类型
export interface IRootState {
  name: string;
  age: number;
}

// 子模块 state 的类型
export interface IRootWithModule {
  login: ILoginState;
  // 这里未来可添加其他子模块的类型
  system: ISystemModule;
}

// 将根模块类型和子模块类型进行交叉
export type IStoreType = IRootState & IRootWithModule;
