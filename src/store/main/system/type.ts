export interface ISystemModule {
  userList: any[];
  userListCount: number;
  roleList: any[];
  roleListCount: number;
}

export interface IGetPageListDataPayload {
  // pageUrl: string;
  pageName: string;
  queryInfo: any;
}
