import { IDataType } from "@/service/type";
import ddrequest from "../../index";
import { IPageListUserReturnData } from "./type";

export const getPageListData = (pageUrl: string, queryInfo: any) => {
  return ddrequest.post<IDataType<IPageListUserReturnData>>({
    url: pageUrl,
    data: queryInfo
  });
};
