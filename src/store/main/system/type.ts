export interface ISystemModule {
  usersList: any[];
  usersListCount: number;
  roleList: any[];
  roleListCount: number;
  menuList: any[];
  menuListCount: number;
  goodsList: any[];
  goodsListCount: number;
  departmentList: any[];
  departmentListCount: number;
}

export interface IGetPageListDataPayload {
  // pageUrl: string;
  pageName: string;
  queryInfo: any;
}

export interface IDeletePageDataPayload {
  pageName: string;
  rowData: any;
}
