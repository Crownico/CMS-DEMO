import { IDataType } from "@/service/type";
import ddrequest from "../../index";
import { IPageListUserReturnData } from "./type";

// 获取列表数据
export const getPageListData = (pageUrl: string, queryInfo: any) => {
  return ddrequest.post<IDataType<IPageListUserReturnData>>({
    url: pageUrl,
    data: queryInfo
  });
};

// 删除某条数据
export const deletePageRowData = (deleteUrl: string) => {
  return ddrequest.delete<IDataType>({
    url: deleteUrl
  });
};
