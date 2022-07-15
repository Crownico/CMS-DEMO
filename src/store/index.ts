import { getPageListData } from "@/service/main/system/system";
import { Store } from "element-plus/es/components/table/src/store";
import { createStore, useStore } from "vuex";
import login from "./login/login";
import system from "./main/system/system";
import { IRootState, IStoreType } from "./type";

const store = createStore<IRootState>({
  state: {
    name: "hhh",
    age: 66,
    entireDepartmentList: [],
    entireRoleList: []
  },
  getters: {},
  mutations: {
    changeDepartmentList(state, departmentList: any[]) {
      state.entireDepartmentList = departmentList;
    },
    changeRoleList(state, roleList: any[]) {
      state.entireRoleList = roleList;
    }
  },
  actions: {
    // 获取全部部门或角色的请求逻辑
    async getInitialDataAction({ commit }) {
      // 获取所有部门数据
      const departmentList = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      commit("changeDepartmentList", departmentList.data.list);
      // 获取所有角色数据
      const roleList = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      commit("changeRoleList", roleList.data.list);
    }
  },
  modules: {
    login,
    system
  }
});
export default store;

export const setupStore = () => {
  store.dispatch("login/loadLocalLogin");
  // store.dispatch("getInitialDataAction");
};

// 对外暴露自己的 useStore 函数，并设置返回的 store 类型为所有 state 的交叉类型
export const useMyStore = (): Store<IStoreType> => {
  return useStore();
};
