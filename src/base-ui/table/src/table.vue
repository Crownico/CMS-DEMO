<template>
  <!-- 表 header -->
  <div class="header">
    <slot name="header">
      <!-- 标题 -->
      <div class="title">{{ title }}</div>
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
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="select"
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
        <el-table-column v-bind="column" align="center">
          <template #default="scope">
            <!-- 动态设置插槽名，并且设置作用域插槽将数据传递出去给插槽使用者 -->
            <slot :name="column.prop" :row="scope.row">
              <!-- 其他用户没有指定修改的数据列默认展示 -->
              {{ scope.row[column.prop] }}
            </slot>
          </template></el-table-column
        ></template
      >
    </el-table>
  </div>
  <!-- 表 footer -->
  <div class="footer">
    <slot name="footer"
      ><el-pagination
        v-model:currentPage="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
    }
  },
  emits: ["selectionChange"],
  setup(props, { emit }) {
    const select = (selection: any) => {
      console.log(selection);
      // 将选中的数据发送出去给用户使用
      emit("selectionChange", selection);
    };
    return { select };
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
