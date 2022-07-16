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
      :otherInfo="treeCheckedDateId"
    >
      <div class="permissionList">
        <!-- 默认插槽不用 template，所以可以用 div 包裹 -->
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/usePageSearch";
import PageModal from "@/components/page-modal/src/page-modal.vue";
import { modalFormConfig } from "./config/modal.config";
import { usePageModal } from "@/hooks/usePageModal";
import { useMyStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";
// 导入 tree 组件实例
import { ElTree } from "element-plus";

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: "role",
  setup() {
    // 调用 page-content 发送请求获取数据
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();

    // 从 vuex 中获取所有菜单列表
    const store = useMyStore();
    const menuList = computed(() => store.state.entireMenuList);

    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    // 点击编辑按钮，将选中行数据的底层菜单id 绑定到树结构中进行选中状态回显
    const editCallback = (rowData: any) => {
      // 获取叶子节点菜单 id
      const menuLeafKeys: number[] = menuMapLeafKeys(rowData.menuList);
      // 将获取 ElTree 实例的操作延后，插入下一微任务队列
      nextTick(() => {
        // 将 id 对应的菜单选框设为选中状态
        elTreeRef.value?.setCheckedKeys(menuLeafKeys, false);
      });
    };

    // 调用 hook 响应 page-content 新增和编辑按钮的点击
    const [pageModalRef, handleAddClick, handleEditClick] = usePageModal(
      undefined,
      editCallback
    );

    const treeCheckedDateId = ref();
    // 增加窗口获取选中的菜单数据
    const handleCheckChange = (currentClickData: any, checkedData: any) => {
      // 不能这么写，数字在对象中是同一个 key，会覆盖
      // treeCheckedDateId.value = {
      //   ...checkedData.checkedKeys,
      //   ...checkedData.halfCheckedKeys
      // };
      const menuList: number[] = [
        ...checkedData.checkedKeys,
        ...checkedData.halfCheckedKeys
      ];
      treeCheckedDateId.value = { menuList };
    };

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
      menuList,
      handleCheckChange,
      treeCheckedDateId,
      elTreeRef
    };
  }
});
</script>

<style scoped>
.permissionList {
  padding-left: 20%;
}
</style>
