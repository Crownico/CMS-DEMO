<template>
  <div class="department">
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="department"
    >
      <!-- 上级部门id转换成名称展示 -->
      <template #parentId="columnData">
        <span>{{ departmentIdToName(columnData.row.parentId) }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
import { departmentIdToName } from "@/utils/idToName";
export default defineComponent({
  name: "department",
  components: { PageContent },
  setup() {
    // 将上级部门 ID 转换为对应的部门名称
    // const departmentIdToName = (parentId: number): string => {
    //   const departmentData = computed(
    //     () =>
    //       // store.getters[`system/pageListData`]("department")
    //       store.state.entireDepartmentList
    //   );
    //   const parentDepartmentData = departmentData.value.find(
    //     (rowData: any) => rowData.id === parentId
    //   );
    //   return parentDepartmentData?.name ?? "无";
    // };
    return { contentTableConfig, departmentIdToName };
  }
});
</script>

<style scoped></style>
