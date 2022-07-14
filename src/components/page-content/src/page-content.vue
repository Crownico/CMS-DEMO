<template>
  <div class="page-content">
    <dd-table
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      :paginationInfo="paginationInfo"
      @pageSizeChange="getPageSize"
      @currentPageChange="getCurrentPage"
    >
      <!-- 表头插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleAddClick">新增</el-button>
      </template>
      <!-- 通过插槽修改 enable 列的数据，columnDate 作用域插槽接收 enable 列的数据 -->
      <template #enable="columnData">
        <!-- 转换展示 -->
        <el-button type="success" plain>{{
          columnData.row.enable === 1 ? "活跃" : "注销"
        }}</el-button>
      </template>
      <!-- 格式化时间展示 -->
      <template #createAt="columnData">
        <span>{{ $filters.formatTime(columnData.row.createAt) }}</span>
      </template>
      <template #updateAt="columnData">
        <span>{{ $filters.formatTime(columnData.row.updateAt) }}</span>
      </template>
      <!-- 操作列 -->
      <template #action="columnData">
        <el-button
          plain
          v-if="isUpdate"
          round
          auto-insert-space
          size="small"
          type="primary"
          @click="handleUpdateClick(columnData.row)"
          >编辑</el-button
        ><el-popconfirm
          title="确定删除这行数据吗?"
          @confirm="handleDeleteClick(columnData.row)"
        >
          <template #reference v-if="isDelete">
            <el-button plain round auto-insert-space size="small" type="danger"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
      <!-- 部门id转换成名称展示 -->
      <template #departmentId="columnData">
        <span>{{ departmentIdToName(columnData.row.departmentId) }}</span>
      </template>
      <!-- 角色id转换成名称展示 -->
      <template #roleId="columnData">
        <span>{{ roleIdToName(columnData.row.roleId) }}</span>
      </template>
      <!-- 更定制化展示的数据列 -->
      <template
        v-for="column in specificColumn"
        :key="column.prop"
        #[column.prop]="columnData"
        ><slot :name="column.prop" :row="columnData.row"> </slot
      ></template>
    </dd-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import DdTable from "@/base-ui/table";
import { useMyStore } from "@/store";
import usePermission from "@/hooks/usePermission";
import { departmentIdToName, roleIdToName } from "@/utils/idToName";

export default defineComponent({
  name: "pageContent",
  components: { DdTable },
  props: {
    contentTableConfig: {
      type: Object as PropType<any>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ["addBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    // 查询用户列表，调用 vuex action
    const store = useMyStore();

    // 操作权限判断
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");

    // 发送服务器请求的参数，分页信息，也是请求的数据量
    const paginationInfo = { pageSize: 10, currentPage: 1 };
    // 获取 pageSize，每页数据条数
    const getPageSize = (pageSize: number) => {
      // 更新最新的 pageSize 到请求参数对象中
      paginationInfo.pageSize = pageSize;
      // 请求服务器
      getPageData();
    };
    // 获取 currentPage 页码
    const getCurrentPage = (currentPage: number) => {
      paginationInfo.currentPage = currentPage;
      getPageData();
    };

    // const getPageSize = (pageSize: number) => (paginationInfo.size = pageSize);
    // 获取数据的请求方法
    const getPageData = (queryInfo: any = {}) => {
      // 因为是一个通用的页面 action，所以通过 url 来指定具体要发送的请求
      store.dispatch("system/getPageListAction", {
        // pageUrl: "/users/list",
        pageName: props.pageName, // 传递页面名字
        // 发送该请求，后端接口需要的请求数据
        queryInfo: {
          offset: (paginationInfo.currentPage - 1) * paginationInfo.pageSize, // 偏移量
          size: paginationInfo.pageSize, // 每页条数
          ...queryInfo
        }
      });
    };
    getPageData();

    // 从 vuex 中获取列表数据，computed 的目的是为了让数据变化后依然能获取到
    // 不直接从 state 中获取数据，而是通过 getters
    // const userList = computed(() => store.state.system.userList);
    // let totalCount = computed(() => store.state.system.userListCount);
    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    // 获取列表数据总数
    const listCount = computed(() => {
      return store.getters[`system/pageListCountData`](props.pageName);
    });

    // 数据转换展示：通用的数据列
    const commonColumn: any[] = [
      "createAt",
      "updateAt",
      "action",
      "departmentId",
      "roleId"
    ];
    // 过滤到通过数据列，给剩下的列设置插槽方便页面组件进行定制化转换展示
    const specificColumn = props.contentTableConfig.propList.filter(
      (item: any) => {
        return commonColumn.indexOf(item.prop) < 0;
      }
    );

    // 删除、新增、编辑按钮
    const handleDeleteClick = (item: any) => {
      // 删除需要发送网络请求，详细逻辑依然在 action 中处理
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        rowData: item
      });
    };
    const handleAddClick = () => {
      emit("addBtnClick");
    };
    const handleUpdateClick = (item: any) => {
      emit("editBtnClick", item);
    };
    return {
      listData,
      getPageData,
      listCount,
      getPageSize,
      getCurrentPage,
      paginationInfo,
      specificColumn,
      usePermission,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleAddClick,
      handleUpdateClick,
      departmentIdToName,
      roleIdToName
    };
  }
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
