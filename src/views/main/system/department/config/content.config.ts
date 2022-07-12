import { IContentTableConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IContentTableConfig = {
  title: "部门列表",
  propList: [
    { prop: "name", label: "部门名称", minWidth: "80" },
    { prop: "parentId", label: "上级部门", minWidth: "80" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "250"
    },
    {
      prop: "leader",
      label: "负责人",
      minWidth: "88"
    },
    { prop: "action", label: "操作", minWidth: "120" }
  ],
  showIndexColumn: true,
  showCheckBoxColumn: true
};
