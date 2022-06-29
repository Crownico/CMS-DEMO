import { getPageListData } from "@/service/main/system/system";
import { IRootState } from "@/store/type";
import { Module } from "vuex";
import { IGetPageListDataPayload, ISystemModule } from "./type";

const systemModule: Module<ISystemModule, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userListCount: 0
    };
  },
  getters: {},
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserListCount(state, totalCount: number) {
      state.userListCount = totalCount;
    }
  },
  actions: {
    // getUser(){}, 因为请求类似，所以我们getUser，而是采用一个更通用的 action
    async getPageListAction({ commit }, payload: IGetPageListDataPayload) {
      console.log(payload);

      // 1. 发送列表网络请求
      // totalCount 是数据条目总数用来分页的
      // const { list, totalCount } = await getPageListData(
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      );
      console.log(pageResult);
      const { list, totalCount } = pageResult.data;
      commit("changeUserList", list);
      commit("changeUserListCount", totalCount);
    }
  }
};

export default systemModule;
