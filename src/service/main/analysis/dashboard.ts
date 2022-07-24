import { IDataType } from "@/service/type";
import ddrequest from "../../index";

// 枚举管理请求 url
enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
  goodsSaleTop10 = "/goods/sale/top10",
  amountList = "/goods/amount/list"
}

export function getCategoryGoodsCount() {
  return ddrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount,
    showLoading: false // 关掉 loading
  });
}

export function getCategoryGoodsSale() {
  return ddrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale,
    showLoading: false
  });
}

export function getCategoryGoodsFavor() {
  return ddrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor,
    showLoading: false
  });
}

export function getAddressGoodsSale() {
  return ddrequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale,
    showLoading: false
  });
}

export function getAmountList() {
  return ddrequest.get<IDataType>({
    url: DashboardAPI.amountList
  });
}
