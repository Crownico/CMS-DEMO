<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="titleRef + modalFormConfig.pageName"
      width="30%"
      center
      destroy-on-close
      lock-scroll
    >
      <dd-form v-bind="modalFormConfig.form" v-model="formData"> </dd-form>
      <!-- 设置默认插槽，方便页面插入一些东西定制化弹窗 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DdForm from "@/base-ui/form";
import { IModalFormConfig } from "./type";
import { useMyStore } from "@/store";

export default defineComponent({
  name: "pageModal",
  components: { DdForm },
  props: {
    modalFormConfig: {
      type: Object as PropType<IModalFormConfig>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const formData = ref();
    const centerDialogVisible = ref(false);
    const currentBtnTypeRef = ref("add");
    const editRowDataId = ref();
    // 弹窗标题
    const titleRef = ref();

    const store = useMyStore();
    // 点击确定发送对应页面的请求
    const handleConfirmClick = () => {
      // 关掉弹窗
      centerDialogVisible.value = false;
      // 判断是新增按钮还是编辑按钮
      if (currentBtnTypeRef.value === "add") {
        console.log("add");
        // 获取输入数据，发送请求
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          // formData: formData.value
          formData: { ...formData.value, ...props.otherInfo }
        });
      } else if (currentBtnTypeRef.value === "edit") {
        console.log("edit");
        // 获取表单输入和所编辑的这行数据的id，修改就是将当前输入数据覆盖这个 id 的原数据
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          formData: { ...formData.value, ...props.otherInfo },
          rowDataId: editRowDataId.value
        });
      }
    };
    // 点击对话框取消按钮关闭弹窗
    const handleCancelClick = () => {
      centerDialogVisible.value = false;
    };

    return {
      formData,
      centerDialogVisible,
      handleConfirmClick,
      handleCancelClick,
      currentBtnTypeRef,
      editRowDataId,
      titleRef
    };
  }
});
</script>

<style scoped></style>
