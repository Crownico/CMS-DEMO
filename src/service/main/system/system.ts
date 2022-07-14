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

// 添加一条数据
export const createPageData = (createUrl: string, formData: any) => {
  return ddrequest.post<IDataType>({
    url: createUrl,
    data: formData
  });
};

// 更新一条数据
export const updatedPageData = (updatedUrl: string, formData: any) => {
  return ddrequest.patch<IDataType>({
    url: updatedUrl,
    data: formData
  });
};
