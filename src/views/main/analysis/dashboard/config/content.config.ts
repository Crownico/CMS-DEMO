import { IContentTableConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IContentTableConfig = {
  // el-table-column 列参数
  propList: [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实姓名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "100" },
    { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "250",
      slotName: "updateAt"
    },
    {
      prop: "action",
      label: "操作",
      minWidth: "150",
      slotName: "action"
    }
  ],
  // 是否开启索引列
  showIndexColumn: true,
  // 是否开启选框列
  showCheckBoxColumn: true
};
