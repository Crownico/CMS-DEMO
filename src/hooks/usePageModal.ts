import { ref } from "vue";
import PageModal from "@/components/page-modal";

type callbackFn = () => void;

export function usePageModal(
  addCallbackFn?: callbackFn,
  editCallbackFn?: callbackFn
) {
  // 将 page-content 的新增按钮和编辑按钮点击后的数据传递给 page-modal
  const pageModalRef = ref<InstanceType<typeof PageModal>>(); // 拿到 page-modal 组件实例
  const handleAddClick = () => {
    if (pageModalRef.value) {
      // 表单数据重置：因为点击编辑按钮后，formData 中已经有数据了，再点击新增按钮就会把 formData 数据回显
      pageModalRef.value.formData = {};
      // 弹出表单窗口
      pageModalRef.value.centerDialogVisible = true;
    }
    addCallbackFn && addCallbackFn();
  };
  const handleEditClick = (rowData: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
      // 数据回显
      pageModalRef.value.formData = rowData;
    }
    editCallbackFn && editCallbackFn();
  };

  // 元组类型，注意使用的时候顺序不能错
  return [pageModalRef, handleAddClick, handleEditClick];
}
