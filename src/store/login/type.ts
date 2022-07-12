export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any[];
  permissions: any[];
}

export interface IAccount {
  name: string;
  password: string;
}
