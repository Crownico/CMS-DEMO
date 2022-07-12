import { IContentTableConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IContentTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "220",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "220",
      slotName: "updateAt"
    },
    { prop: "action", label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    // 该对象的属性将绑定到 el-table 上，开启数据树形展示
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  showFooter: false
};
