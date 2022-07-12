<template>
  <div class="goods">
    <div class="search"></div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :pageName="'goods'"
        :contentTableConfig="contentTableConfig"
      >
        <!-- 插槽转换展示价格 -->
        <template #oldPrice="columnData">
          <span>{{ "￥" + columnData.row.oldPrice }}</span>
        </template>
        <template #newPrice="columnData">
          <span>{{ "￥" + columnData.row.oldPrice }}</span>
        </template>
        <!-- 转换展示图片 -->
        <template #imgUrl="columnData">
          <el-image
            style="width: 100px; height: 100px"
            :src="columnData.row.imgUrl"
            :previewSrcList="[columnData.row.imgUrl]"
            :fit="`scale-down`"
            preview-teleported
          />
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/usePageSearch";

export default defineComponent({
  components: { PageContent },
  name: "goods",
  setup() {
    // 调用 page-content 发送请求获取数据
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();

    return {
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick
    };
  }
});
</script>

<style scoped></style>
