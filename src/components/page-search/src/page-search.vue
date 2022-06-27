<template>
  <div class="page-search">
    <!-- 可配置表单组件 -->
    <dd-form v-bind="searchFormConfig" v-model="formData">
      <!-- 填充头插槽 -->
      <template #header>
        <div class="heard">
          <h1>搜索模块</h1>
        </div>
      </template>
      <!-- 填充按钮插槽 -->
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </dd-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DdForm from "@/base-ui/form";
export default defineComponent({
  components: { DdForm },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    // 收集 dd-form 组件的输入数据，表单项是动态配置的，收集数据肯定不能这么写死，所以后续优化
    const formData = ref({
      id: "",
      name: "",
      realname: "",
      cellphone: ""
    });
    return { formData };
  }
});
</script>

<style scoped lang="less"></style>
