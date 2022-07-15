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
        @addBtnClick="handleAddClick"
        @editBtnClick="handleEditClick"
      ></page-content>
    </div>
    <!-- 弹窗 -->
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalFormConfig="modalFormConfig"
    >
      <template #default>
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/usePageSearch";
import PageModal from "@/components/page-modal/src/page-modal.vue";
import { modalFormConfig } from "./config/modal.config";
import { usePageModal } from "@/hooks/usePageModal";
import { useMyStore } from "@/store";

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: "role",
  setup() {
    // 调用 page-content 发送请求获取数据
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();

    // 调用 hook 响应 page-content 新增和编辑按钮的点击
    const [pageModalRef, handleAddClick, handleEditClick] = usePageModal();

    // 从 vuex 中获取所有菜单列表
    const store = useMyStore();
    const menuList = computed(() => store.state.entireMenuList);

    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick,
      modalFormConfig,
      handleAddClick,
      handleEditClick,
      pageModalRef,
      menuList
    };
  }
});
</script>

<style scoped></style>
