// 返回的数据类型，因为可能过于复杂，所以设置泛型让用户决定是否明确类型，不明确则默认值为 any
export interface IDataType<T = any> {
  code: number;
  data: T;
}
