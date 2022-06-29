import { Store } from "element-plus/es/components/table/src/store";
import { createStore, useStore } from "vuex";
import login from "./login/login";
import system from "./main/system/system";
import { IRootState, IStoreType } from "./type";

const store = createStore<IRootState>({
  state: {
    name: "hhh",
    age: 66
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
});
export default store;

export const setupStore = () => {
  store.dispatch("login/loadLocalLogin");
};

// 对外暴露自己的 useStore 函数，并设置返回的 store 类型为所有 state 的交叉类型
export const useMyStore = (): Store<IStoreType> => {
  return useStore();
};
