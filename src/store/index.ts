import { createStore } from "vuex";
import login from "./login/login";
import { IRootState } from "./type";

const store = createStore<IRootState>({
  state: {
    name: "hhh",
    age: 66
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
});
export default store;

export const setupStore = () => {
  store.dispatch("login/loadLocalLogin");
};
