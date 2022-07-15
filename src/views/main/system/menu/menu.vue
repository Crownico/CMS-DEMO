<template>
  <div class="menu">
    <div class="content">
      <page-content pageName="menu" :contentTableConfig="contentTableConfig">
        <!-- 菜单icon 插槽 -->
        <template #icon="columnData">
          <el-icon>
            <component :is="`${elIconFormat(columnData.row.icon) + ''}`" />
          </el-icon>
          <!-- <span> {{ elIconFormat(columnData.row.icon) }}</span> -->
        </template>
        <!-- 类型插槽 -->
        <template #type="columnData">
          <el-tag class="ml-2" type="success" v-if="columnData.row.type === 1">
            {{ `类型：${columnData.row.type}` }}</el-tag
          >
          <el-tag
            class="ml-2"
            type="warning"
            v-else-if="columnData.row.type === 2"
          >
            {{ `类型：${columnData.row.type}` }}</el-tag
          >
          <el-tag
            class="ml-2"
            type="danger"
            v-else-if="columnData.row.type === 3"
          >
            {{ `类型：${columnData.row.type}` }}</el-tag
          >
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
// import usePageSearch from "@/hooks/usePageSearch";
import elIconFormat from "@/utils/icon-format";

export default defineComponent({
  components: { PageContent },
  name: "menus",
  setup() {
    // 调用 page-content 发送请求获取数据
    // const [pageContentRef, handleQueryClick, handleResetClick] =
    //   usePageSearch();

    return {
      contentTableConfig,
      elIconFormat
    };
  }
});
</script>

<style scoped></style>
