<template>
  <div class="table-container">
    <el-table :data="listData" border style="width: 100%">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DdTabel",
  props: {
    // 列表总数据
    listData: {
      type: Array,
      required: true
    },
    // 使列表数据和列对应的参数
    propList: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
