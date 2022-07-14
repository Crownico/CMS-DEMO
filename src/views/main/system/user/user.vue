<template>
  <div class="user">
    <!-- 搜索框 -->
    <div class="search">
      <!-- <el-form label-width="100px">
        <el-row>
          <el-col :span="8"
            ><el-form-item label="账号">
              <el-input placeholder="account" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="密码">
              <el-input placeholder="password"> </el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="你喜欢的运动">
              <el-select>
                <el-option label="篮球" value="shanghai" />
                <el-option label="足球" value="beijing" />
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col
            ><el-form-item label="时间"> <el-input></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form> -->
      <!-- <dd-form v-bind="searchFormConfig" v-model="fuformData"></dd-form> -->
      <page-search
        :searchFormConfig="searchFormConfig"
        @queryBtnClick="handleQueryClick"
        @resetBtnClick="handleResetClick"
      ></page-search>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 表格展示列表数据 -->
      <page-content
        ref="pageContentRef"
        :pageName="'users'"
        :contentTableConfig="contentTableConfig"
        @addBtnClick="handleAddClick"
        @editBtnClick="handleEditClick"
      >
        <template #enable="columnData">
          <!-- 转换展示 -->
          <el-button type="success" plain>{{
            columnData.row.enable === 1 ? "活跃" : "注销"
          }}</el-button>
        </template>
      </page-content>
    </div>
    <!-- 新增用户页面弹窗 -->
    <page-modal
      pageName="users"
      ref="pageModalRef"
      :modalFormConfig="modalFormConfigRef"
    ></page-modal>
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
  name: "users",
  setup() {
    // 收集 dd-form 组件的输入数据
    // const fuformData = ref({
    //   id: "",
    //   name: "",
    //   realname: "",
    //   cellphone: ""
    // });

    // 调用 page-content 发送请求获取数据
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();
    // 编辑窗口隐藏密码输入框
    const editCallback = () => {
      const passwordFormItem = modalFormConfig.form.formItems.find(
        (formItem) => formItem.field === "password"
      );
      // 注意 isHidden 本身的值就是 false，所以判断 undefined 不能通过 if(passwordFormItem?.isHidden) 来判断
      if (passwordFormItem?.isHidden != undefined) {
        passwordFormItem.isHidden = true;
      }
    };
    // 新增窗口重新展示密码输入框
    const addCallback = () => {
      const passwordFormItem = modalFormConfig.form.formItems.find(
        (formItem) => formItem.field === "password"
      );
      if (passwordFormItem?.isHidden != undefined) {
        passwordFormItem.isHidden = false;
      }
    };

    // 调用 hook，弹出新增窗口和编辑窗口的数据回显
    const [pageModalRef, handleAddClick, handleEditClick] = usePageModal(
      addCallback,
      editCallback
    );

    // 加强配置对象，能实时刷新自己到页面上
    const modalFormConfigRef = computed(() => {
      // 给新增或编辑窗口部门和角色下拉框动态添加数据
      const departmentSelect = modalFormConfig.form.formItems.find(
        (formItem) => formItem.field === "departmentId"
      );
      const store = useMyStore();
      if (departmentSelect?.options) {
        departmentSelect.options = store.state.entireDepartmentList.map(
          (departmentItem: any) => {
            return { label: departmentItem.name, value: departmentItem.id };
          }
        );
      }
      const roleSelect = modalFormConfig.form.formItems.find(
        (formItem) => formItem.field === "roleId"
      );
      if (roleSelect?.options) {
        roleSelect.options = store.state.entireRoleList.map((roleItem: any) => {
          return { label: roleItem.name, value: roleItem.id };
        });
      }
      return modalFormConfig;
    });

    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick,
      modalFormConfigRef,
      handleAddClick,
      handleEditClick,
      pageModalRef
    };
  }
});
</script>

<style scoped lang="less"></style>
