import { Module } from "vuex";
import { IRootState } from "../type";
import { ILoginState, IAccount } from "./type";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";

// 声明类型为 Module，它有两个泛型，第一个是当前模块 state 的类型，第二个是根 state 的类型
const loginState: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus;
    }
  },
  actions: {
    // 因为登录需要发送很多异步请求，所以改成异步函数
    async acountLoginRequestAction(context, account: IAccount) {
      // request.get();
      // console.log("登录", account);
      // 1. 登录请求，调用封装好的登录请求模块
      const loginResult = await accountLoginRequest(account);
      console.log(`1. 登录请求的结果：${loginResult}`);
      console.log(loginResult);

      // 1.1 从请求结果中获取 token 和 用户信息
      const { id, token } = loginResult;
      // 1.2 提交数据变更到 mutation
      context.commit("changeToken", token);
      // 1.3 将 token 放入本地缓存中
      // 注意要以 json 格式放入，也就是 string 用双引号包裹
      // 因为获取 token 的封装中使用了 JSON.parse 解析，它只能解析 json 数据，无法解析 string
      localStorage.setItem("token", JSON.stringify(token));

      // 2. 发送请求获取用户信息
      const userInfoResult = await requestUserInfoById(id);
      console.log(`2. 获取登录用户信息：${userInfoResult}`);
      console.log(userInfoResult);

      context.commit("changeUserInfo", userInfoResult);
      // 用户登录后，来到首页也需要展示用户信息，所以用户信息一般也需要缓存
      localCache.setCache("userInfo", userInfoResult);

      // 3. 获取用户权限对应的菜单
      const userMenusResult = await requestUserMenusByRoleId(
        userInfoResult.roleId
      );
      console.log(`3. 获取登录用户菜单信息：${userMenusResult}`);
      console.log(userMenusResult);

      context.commit("changeUserMenus", userMenusResult);
      localCache.setCache("userMenus", userMenusResult);

      // 4. 跳转到首页
      router.push("/main");
    },
    // 手动载入本地缓存数据到 vuex
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      console.log(`从缓存中获取的 token：${token}`);

      if (token) {
        commit("changeToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  },
  modules: {}
};

export default loginState;
