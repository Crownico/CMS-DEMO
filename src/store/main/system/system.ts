import {
  createPageData,
  deletePageRowData,
  getPageListData,
  updatedPageData
} from "@/service/main/system/system";
import { IRootState } from "@/store/type";
import { Module } from "vuex";
import {
  ICreatePageDataPayload,
  IDeletePageDataPayload,
  IEditPageDataPayload,
  IGetPageListDataPayload,
  ISystemModule
} from "./type";

const systemModule: Module<ISystemModule, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersListCount: 0,
      roleList: [],
      roleListCount: 0,
      menuList: [],
      menuListCount: 0,
      goodsList: [],
      goodsListCount: 0,
      departmentList: [],
      departmentListCount: 0
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
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersListCount(state, totalCount: number) {
      state.usersListCount = totalCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleListCount(state, totalCount: number) {
      state.roleListCount = totalCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuListCount(state, totalCount: number) {
      state.menuListCount = totalCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsListCount(state, totalCount: number) {
      state.goodsListCount = totalCount;
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList;
    },
    changeDepartmentListCount(state, totalCount: number) {
      state.departmentListCount = totalCount;
    }
  },
  actions: {
    // getUser(){}, 因为请求类似，所以我们不根据具体页面 getData，而是采用一个多页面更通用的 action
    async getPageListAction({ commit }, payload: IGetPageListDataPayload) {
      console.log(payload);

      // 1. 获取 pageUrl
      const pageName = payload.pageName;
      // 根据页面名字拼接出或 switch 匹配该页面对应的 url
      // const pageUrl = `/${pageName}/list`;
      let pageUrl = "";
      switch (payload.pageName) {
        case "users":
          pageUrl = "/users/list";
          break;
        case "role":
          pageUrl = "/role/list";
          break;
        case "menu":
          pageUrl = "/menu/list";
          break;
        case "goods":
          pageUrl = "/goods/list";
          break;
        case "department":
          pageUrl = "/department/list";
          break;
        default:
          break;
      }

      // 2. 发送列表网络请求
      // totalCount 是数据条目总数用来分页的
      // const { list, totalCount } = await getPageListData(
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // console.log(pageResult);

      // 3. 将数据保存到 state 中
      const { list, totalCount } = pageResult.data;

      // 拼接出对应的 mutation 方法
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      // commit("changeUserList", list);
      // commit("changeUserListCount", totalCount);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}ListCount`, totalCount);
    },

    // 列表删除行数据
    async deletePageDataAction({ dispatch }, payload: IDeletePageDataPayload) {
      // 从参数中获取 pageName 和要删除的行数据，页面名称是要拼接成对应的删除 url
      const { pageName, rowData } = payload;
      // 拼接处删除 url
      const deleteUrl = `/${pageName}/${rowData.id}`;
      // 调用 service 发送真正的网络请求
      const res = await deletePageRowData(deleteUrl);
      console.log(res);

      // 重新请求最新的数据
      // 优化：这里查询条件写死了，发送默认的是搜索请求；应该获取用户搜索输入框中的数据发送请求查询最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    // 添加数据
    async createPageDataAction({ dispatch }, payload: ICreatePageDataPayload) {
      console.log(payload);
      // 拼接或 switch 出增加数据的 url
      const { pageName, formData } = payload;
      const pageUrl = `/${pageName}`;
      // 发送增加一条数据的网络请求
      await createPageData(pageUrl, formData);
      // 新增后查询首页数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    // 编辑数据
    async editPageDataAction({ dispatch }, payload: IEditPageDataPayload) {
      console.log(payload);
      const { pageName, formData, rowDataId } = payload;
      const pageUrl = `/${pageName}/${rowDataId}`;
      console.log(pageUrl);

      // 发送更新网络请求
      await updatedPageData(pageUrl, formData);
      // 更新后查询首页数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
