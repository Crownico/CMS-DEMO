import { getPageListData } from "@/service/main/system/system";
import { IRootState } from "@/store/type";
import { Module } from "vuex";
import { IGetPageListDataPayload, ISystemModule } from "./type";

const systemModule: Module<ISystemModule, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userListCount: 0,
      roleList: [],
      roleListCount: 0
    };
  },
  getters: {
    pageListData(state) {
      // getters 能返回一个函数，函数就可以通过参数，页面组件名获取对应 state 中的数据
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]; // 拼接出 state 中数据名的方式
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      };
    },
    pageListCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}ListCount`];
      };
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserListCount(state, totalCount: number) {
      state.userListCount = totalCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleListCount(state, totalCount: number) {
      state.roleListCount = totalCount;
    }
  },
  actions: {
    // getUser(){}, 因为请求类似，所以我们getUser，而是采用一个更通用的 action
    async getPageListAction({ commit }, payload: IGetPageListDataPayload) {
      console.log(payload);

      // 1. 获取 pageUrl
      const pageName = payload.pageName;
      // 根据页面名字拼接出或 switch 匹配该页面对应的 url
      // const pageUrl = `/${pageName}/list`;
      let pageUrl = "";
      switch (payload.pageName) {
        case "user":
          pageUrl = "/users/list";
          break;
        case "role":
          pageUrl = "/role/list";
          break;
        default:
          break;
      }

      // 2. 发送列表网络请求
      // totalCount 是数据条目总数用来分页的
      // const { list, totalCount } = await getPageListData(
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      console.log(pageResult);

      // 3. 将数据保存到 state 中
      const { list, totalCount } = pageResult.data;

      // 拼接出对应的 mutation 方法
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      // commit("changeUserList", list);
      // commit("changeUserListCount", totalCount);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}ListCount`, totalCount);
    }
  }
};

export default systemModule;
