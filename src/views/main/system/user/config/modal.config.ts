import { IModalFormConfig } from "@/components/page-modal/src/type";

export const modalFormConfig: IModalFormConfig = {
  title: "新建用户",
  form: {
    formItems: [
      {
        field: "name",
        type: "input",
        label: "用户名"
      },
      {
        field: "realname",
        type: "input",
        label: "真实姓名"
      },
      {
        field: "password",
        type: "password",
        label: "密码"
      },
      {
        field: "cellphone",
        type: "input",
        label: "手机号码"
      },
      {
        field: "departmentId",
        type: "select",
        label: "部门"
      },
      {
        field: "roleId",
        type: "select",
        label: "角色"
      }
    ],
    colLayout: {
      xl: 24
    }
  }
};
