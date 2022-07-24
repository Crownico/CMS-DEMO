export interface IPanelData {
  number1: number;
  number2: number;
  title: string;
  subtitle: string;
  tips: string;
  amount: string;
  options?: {
    decimalPlaces?: number; // 保留两位
    duration?: number; // 动画时长
    separator?: string; // 千位分割
    decimal?: string; // 小数分割
    prefix?: string; // 单位
  };
}
