import ddrequest from "../index";
import { IAccount, ILoginReturnData, IloginUserInfo } from "./type";

// 请求链接url可以定义成枚举类型方便管理
enum loginURl {
  accountLogin = "/adminLogin",
  userInfo = "/userInfo",
  userMenus = "/userMenus"
}

// 封装登录的 axios 请求
export const accountLoginRequest = (account: IAccount) => {
  // console.log("发送 post 请求");
  // const accountJson = JSON.stringify(account);
  // console.log(accountJson);

  return ddrequest.post<ILoginReturnData>({
    // method: "post",
    url: loginURl.accountLogin,
    data: account
    // headers: {
    //   "Content-Type": "application/json",
    //   accept: "/",
    //   connection: "keep-alive",
    //   origin: "http://192.168.139.1:8080"
    // }
  });
  // return ddrequest.get({
  //   // method: "get",
  //   // url: "/home/multidata"
  //   url: "/get"
  // });
};

export const requestUserInfoById = (id: string) => {
  return ddrequest.get<IloginUserInfo>({
    url: loginURl.userInfo,
    params: {
      userId: id
    }
  });
};

export const requestUserMenusByRoleId = (roleId: number) => {
  return ddrequest.get<any>({
    url: loginURl.userMenus,
    params: {
      roleId: roleId
    }
  });
};
