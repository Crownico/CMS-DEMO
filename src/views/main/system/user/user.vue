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
    <page-modal :modalFormConfig="modalFormConfig"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/usePageSearch";
import PageModal from "@/components/page-modal/src/page-modal.vue";
import { modalFormConfig } from "./config/modal.config";

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

    // 返回的列表数据注册到 el-table-column 中和列对应所需的参数
    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      handleResetClick,
      modalFormConfig
    };
  }
});
</script>

<style scoped lang="less"></style>
