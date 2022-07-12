// 将 el-icon-hhh 字符串截断格式化成图标组件名 Hhh
export default function elIconFormat(iconStr: string): string {
  if (iconStr === undefined) return iconStr;

  // 裁剪数组去掉 el-icon 前缀
  const iconStrArr: string[] = iconStr?.split("-")?.slice(2);

  // 将 iconStrArr 数组元素每个首字母大写
  const temp: string[] = iconStrArr.map((item: string) => {
    return item.replace(/^\w/, (c: string) => c.toUpperCase());
  });

  // 将 temp 数组元素拼接成字符串
  return temp.join("");
}
