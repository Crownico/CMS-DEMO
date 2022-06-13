import ddrequest from "../index";
import { IAccount, IDataType, ILoginReturnData } from "./type";

// 请求链接url可以定义成枚举类型方便管理
enum loginURl {
  accountLogin = "/login",
  userInfo = "/users",
  userMenus = "/role"
}

// 封装登录的 axios 请求
export const accountLoginRequest = (account: IAccount) => {
  // console.log("发送 post 请求");
  // const accountJson = JSON.stringify(account);
  // console.log(accountJson);

  return ddrequest.post<IDataType<ILoginReturnData>>({
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

export const requestUserInfoById = (id: number) => {
  return ddrequest.get<IDataType>({
    url: loginURl.userInfo + `/${id}`,
    showLoading: false // 把后两个请求的 loading 效果关了，要不然会三个 loading 闪现
    // params: {
    //   userId: id
    // }
  });
};

export const requestUserMenusByRoleId = (roleId: number) => {
  return ddrequest.get<IDataType>({
    url: loginURl.userMenus + `/${roleId}` + `/menu`,
    showLoading: false
    // params: {
    //   roleId: roleId
    // }
  });
};
