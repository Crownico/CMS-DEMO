<template>
  <!-- 表 header -->
  <div class="header">
    <slot name="header">
      <!-- 标题 -->
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <!-- 表头的操作 -->
      <div class="handler">
        <slot name="headerHandler">
          <el-button type="primary">操作</el-button>
        </slot>
      </div>
    </slot>
  </div>
  <!-- 表内容 -->
  <div class="table-container">
    <!-- 滚动 -->
    <!-- <el-scrollbar max-height="500px"> -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="select"
      max-height="75vh"
      v-bind="childrenProps"
    >
      <!-- checkbox 列 -->
      <el-table-column
        type="selection"
        v-if="showCheckBoxColumn"
        align="center"
      ></el-table-column>
      <!-- 索引列 -->
      <el-table-column
        type="index"
        v-if="showIndexColumn"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <!-- prop 对应了数据对象的 key， label 表示表头-->
      <template v-for="column in propList" :key="column.prop">
        <!-- 批量绑定参数 -->
        <el-table-column v-bind="column" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 动态设置插槽名，并且设置作用域插槽将数据传递出去给插槽使用者 -->
            <slot :name="column.prop" :row="scope.row">
              <!-- 其他用户没有指定修改的数据列默认展示 -->
              <span>{{ scope.row[column.prop] }}</span>
            </slot>
          </template></el-table-column
        >
      </template>
    </el-table>
    <!-- </el-scrollbar> -->
  </div>
  <!-- 表 footer -->
  <div class="footer" v-if="showFooter">
    <slot name="footer"
      ><el-pagination
        v-model:currentPage="paginationInfo.currentPage"
        v-model:pageSize="paginationInfo.pageSize"
        :page-sizes="[10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-count="
          listCount % paginationInfo.pageSize == 0
            ? listCount / paginationInfo.pageSize
            : Math.floor(listCount / paginationInfo.pageSize) + 1
        "
        :total="listCount"
        @update:page-size="handlePageSizeChange"
        @update:current-page="handleCurrentPageChange"
    /></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DdTabel",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    // 列表总数据
    listData: {
      type: Array,
      required: true
    },
    // 列表数据长度
    listCount: {
      type: Number,
      default: 0
    },
    // 使列表数据和列对应的参数
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showCheckBoxColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    paginationInfo: {
      type: Object as PropType<{ pageSize: number; currentPage: number }>,
      required: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["selectionChange", "pageSizeChange", "currentPageChange"],
  setup(props, { emit }) {
    const select = (selection: any) => {
      console.log(selection);
      // 将选中的数据发送出去给用户使用
      emit("selectionChange", selection);
    };
    // 监听 pageSize 的改变
    const handlePageSizeChange = (pageSize: number) => {
      // 将改变传递出去作为参数请求服务器
      emit("pageSizeChange", pageSize);
    };
    // 监听 currentPage 的改变
    const handleCurrentPageChange = (currentPage: number) => {
      emit("currentPageChange", currentPage);
    };

    return {
      select,
      handlePageSizeChange,
      handleCurrentPageChange
    };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  display: flex;
  margin-top: 15px;
  justify-content: flex-end;
}
</style>
