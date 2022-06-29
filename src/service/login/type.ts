export interface IAccount {
  name: string;
  password: string;
}
// 登录请求返回数据的类型
export interface ILoginReturnData {
  id: number;
  name: string;
  token: string;
}
