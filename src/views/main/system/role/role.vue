<template>
  <div class="role">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @queryBtnClick="handleQueryClick"
        @resetBtnClick="handleResetClick"
      ></page-search>
    </div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :pageName="'role'"
        :contentTableConfig="contentTableConfig"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/usePageSearch";

export default defineComponent({
  components: { PageSearch, PageContent },
  name: "role",
  setup() {
    // 调用 page-content 发送请求获取数据
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();

    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick
    };
  }
});
</script>

<style scoped></style>
