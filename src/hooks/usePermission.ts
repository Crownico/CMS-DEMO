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
  // console.log(verifyPermission);

  // 比对所有权限中是否有该操作的权限
  return !!permissions.find((item) => item === verifyPermission);
}
