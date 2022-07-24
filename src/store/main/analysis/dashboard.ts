import {
  getAddressGoodsSale,
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "@/service/main/analysis/dashboard";
import { IRootState } from "@/store/type";
import { Module } from "vuex";
import { IAnalysisModule } from "./type";

const dashboardModule: Module<IAnalysisModule, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      topPanelDatas: []
    };
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list;
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  getters: {},
  actions: {
    async getDashboardDataAction({ commit }) {
      const resultTopPanelDatas = await getAmountList();
      commit("changeTopPanelDatas", resultTopPanelDatas.data);
      const categoryCountResult = await getCategoryGoodsCount();
      commit("changeCategoryGoodsCount", categoryCountResult.data);
      const categorySaleResult = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categorySaleResult.data);
      const categoryFavorResult = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryFavorResult.data);
      const addressGoodsResult = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", addressGoodsResult.data);
    }
  }
};

export default dashboardModule;
