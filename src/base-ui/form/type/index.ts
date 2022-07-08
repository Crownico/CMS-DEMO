type IFormType = "input" | "password" | "select" | "datepicker";

// 表单项具体信息类型
export interface IFormItem {
  type: IFormType; // 因为表单输入框就几种，所以使用字面量联合类型
  label: string;
  field: string;
  placeholder?: any;
  rules?: any[];
  // 针对select
  options?: any[];
  // 针对特殊的属性
  otherOptions?: any;
  // 组件中通过 v-if 进行判断是否隐藏，不写默认为 false，所以记得要取反
  isHidden?: boolean;
}

// 配置表单的类型
export default interface IForm {
  // 配置表单项目的类型
  formItems: IFormItem[];
  // 配置 label 宽度的类型
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
