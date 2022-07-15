import { IModalFormConfig } from "@/components/page-modal/src/type";

export const modalFormConfig: IModalFormConfig = {
  pageName: "角色",
  form: {
    formItems: [
      {
        field: "name",
        type: "input",
        label: "角色名",
        placeholder: "请输入角色名"
      },
      {
        field: "intro",
        type: "input",
        label: "权限介绍",
        placeholder: "请输入权限介绍"
      }
    ],
    colLayout: {
      xl: 24
    }
  }
};
