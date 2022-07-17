import { IDataType } from "@/service/type";
import hyRequest from "../../index";

// 枚举管理请求 url
enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

export function getCategoryGoodsCount() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount,
    showLoading: false // 关掉 loading
  });
}

export function getCategoryGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale,
    showLoading: false
  });
}

export function getCategoryGoodsFavor() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor,
    showLoading: false
  });
}

export function getAddressGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale,
    showLoading: false
  });
}
