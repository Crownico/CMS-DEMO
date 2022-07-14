import { useMyStore } from "@/store";
import { computed } from "vue";

// departmentId to departmentName
export const departmentIdToName = (departmentId: number) => {
  const store = useMyStore();
  // 获取所有部门数据
  const departmentDataList = computed(() => store.state.entireDepartmentList);
  const departmentData = departmentDataList.value.find(
    (departmentData: any) => departmentData.id === departmentId
  );
  return departmentData?.name ?? "无";
};

// roleId to roleName
export const roleIdToName = (roleId: number) => {
  const store = useMyStore();
  // 获取所有部门数据
  const roleDataList = computed(() => store.state.entireRoleList);
  const roleData = roleDataList.value.find(
    (departmentData: any) => departmentData.id === roleId
  );
  return roleData?.name ?? "无";
};
