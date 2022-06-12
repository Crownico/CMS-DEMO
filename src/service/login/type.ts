export interface IAccount {
  name: string;
  password: string;
}
// 登录请求返回数据的类型
export interface ILoginReturnData {
  id: string;
  name: string;
  token: string;
}
// 登录用户的个人信息
export interface IloginUserInfo {
  name: string;
  age: number;
  address: string;
  roleId: number;
}
