import { useMyStore } from "@/store";

export default function usePermission(
  pageName: string,
  handleName: string
): boolean {
  // 从 vuex 中获取所有权限
  const store = useMyStore();
  const permissions: string[] = store.state.login.permissions;

  // 根据参数，拼接出权限的 url
  const verifyPermission = `system:${pageName}:${handleName}`;
  console.log(verifyPermission);

  // 比对所有权限中是否有该操作的权限
  return !!permissions.find((item) => item === verifyPermission);
}

// 这是一个小技巧，比较数组中是否有该元素，双取反返回布尔值代替 Boolean()
// find 函数接收参数函数，参数函数一个一个接收数组元素，这就可以在参数函数中通过 === 号进行直观的比较。
// 当参数函数的返回值为 true，find 函数则会返回当前进入参数函数的数组元素，否则返回 undefined。
// 我们知道正常的值布尔取值为 true。这时我们想要将结果转成布尔值，只需要让 Boolean() 包裹返回结果就行。
// 取反也进行了布尔计算，但是正常值取反为 false，为了让它正回来就再次取反。相当于复位。
// 总结双取反，第一个取反主要目的为布尔运算，第二个取反目的为复位布尔运算结果。
