import { ref } from "vue";
import PageContent from "@/components/page-content/index";

export default function usePageSearch(): any {
  // 获取组件实例，page-content
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  // 查询按钮
  const handleQueryClick = (queryInfo: any) => {
    // 调用子组件 page-content 中获取数据的方法
    pageContentRef.value?.getPageData(queryInfo);
  };
  // 重置按钮
  const handleResetClick = () => {
    // 重置按钮进行默认查询
    pageContentRef.value?.getPageData();
  };

  // 以元组类型方式导出，元组类型可以定制数组元素具体类型
  return [pageContentRef, handleQueryClick, handleResetClick];
}
