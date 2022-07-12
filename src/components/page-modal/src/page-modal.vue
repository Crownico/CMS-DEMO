<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="modalFormConfig.title"
      width="30%"
      center
    >
      <dd-form v-bind="modalFormConfig.form" v-model="formData"> </dd-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DdForm from "@/base-ui/form";
import { IModalFormConfig } from "./type";

export default defineComponent({
  name: "pageModal",
  components: { DdForm },
  props: {
    modalFormConfig: {
      type: Object as PropType<IModalFormConfig>,
      required: true
    },
    centerDialogVisible: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const formData = ref();
    return { formData };
  }
});
</script>

<style scoped></style>
