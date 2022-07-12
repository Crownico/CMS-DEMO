<template>
  <div class="department">
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="department"
    >
      <!-- 上级部门转换展示 -->
      <template #parentId="columnData">
        <span>{{ parentIdToName(columnData.row.parentId) }}</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
import { useMyStore } from "@/store";
export default defineComponent({
  name: "department",
  components: { PageContent },
  setup() {
    const store = useMyStore();
    // 将上级部门 ID 转换为对应的部门名称
    const parentIdToName = (parentId: number): string => {
      const departmentData = computed(() =>
        store.getters[`system/pageListData`]("department")
      );
      const parentDepartmentData = departmentData.value.find(
        (rowData: any) => rowData.id === parentId
      );
      return parentDepartmentData?.name ?? "无";
    };
    return { contentTableConfig, parentIdToName };
  }
});
</script>

<style scoped></style>
