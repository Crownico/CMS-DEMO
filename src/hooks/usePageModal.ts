import { ref } from "vue";
import PageModal from "@/components/page-modal";

type addCallbackFn = () => void;
type editCallbackFn = (rowData: any) => void;

export function usePageModal(
  addCallbackFn?: addCallbackFn,
  editCallbackFn?: editCallbackFn
) {
  // 将 page-content 的新增按钮和编辑按钮点击后的数据传递给 page-modal
  const pageModalRef = ref<InstanceType<typeof PageModal>>(); // 拿到 page-modal 组件实例

  // 点击按钮
  const handleAddClick = () => {
    if (pageModalRef.value) {
      // 表单数据重置：因为点击编辑按钮后，formData 中已经有数据了，再点击新增按钮就会把 formData 数据回显
      pageModalRef.value.formData = {};
      // 弹出表单窗口
      pageModalRef.value.centerDialogVisible = true;
      // 传递给 pageModal 点击的按钮类型
      pageModalRef.value.currentBtnTypeRef = "add";
      // 弹窗标题
      pageModalRef.value.titleRef = "新增";
    }
    addCallbackFn && addCallbackFn();
  };
  // 编辑按钮
  const handleEditClick = (rowData: any) => {
    console.log(rowData);

    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
      // 数据回显
      pageModalRef.value.formData = rowData;
      pageModalRef.value.currentBtnTypeRef = "edit";
      pageModalRef.value.editRowDataId = rowData.id;
      pageModalRef.value.titleRef = "编辑";
    }
    editCallbackFn && editCallbackFn(rowData);
  };

  // 元组类型，注意使用的时候顺序不能错
  return [pageModalRef, handleAddClick, handleEditClick];
}
