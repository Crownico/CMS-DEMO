export interface ISystemModule {
  userList: any[];
  userListCount: number;
  roleList: any[];
  roleListCount: number;
  menuList: any[];
  menuListCount: number;
}

export interface IGetPageListDataPayload {
  // pageUrl: string;
  pageName: string;
  queryInfo: any;
}
