<template>
  <div class="page-search">
    <!-- 可配置表单组件 -->
    <dd-form v-bind="searchFormConfig" v-model="formData">
      <!-- 填充头插槽 -->
      <template #header>
        <div class="header">
          <h3>高级搜索</h3>
        </div>
      </template>
      <!-- 填充按钮插槽 -->
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon><span>搜索</span></el-button
          >
          <el-button type="info" @click="handleResetClick"
            ><el-icon><RefreshRight /></el-icon><span>重置</span></el-button
          >
        </div>
      </template>
    </dd-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DdForm from "@/base-ui/form";
import IForm, { IFormItem } from "@/base-ui/form/type";
export default defineComponent({
  components: { DdForm },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    // 收集 dd-form 组件的输入数据，表单项是动态配置的，收集数据肯定不能这么写死，所以后续优化
    //   const formData = ref({
    //     id: "",
    //     name: "",
    //     realname: "",
    //     cellphone: ""
    //   });
    //   return { formData };
    // }

    // 收集输入的数据
    const formOriginData: any = {};
    const formItems: IFormItem[] = props.searchFormConfig?.formItems ?? [];
    for (const formItem of formItems) {
      // 根据配置文件，动态添加 field 作为表单数据的 key
      formOriginData[formItem.field] = "";
    }
    const formData = ref(formOriginData);

    // 重置输入
    const handleResetClick = () => {
      // 浅拷贝，无法让页面也还原清空数据
      // formData.value = formOriginData;
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key];
      }

      // 并且触发事件，默认条件查询列表数据，所以没有查询参数
      emit("resetBtnClick");
    };

    // 搜索
    const handleQueryClick = () => {
      // 向外（页面组件）触发 queryBtnClick 事件
      emit("queryBtnClick", formData.value);
    };

    return { formData, handleResetClick, handleQueryClick };
  }
});
</script>

<style scoped lang="less">
.page-search {
  padding: 20px;
}
</style>
