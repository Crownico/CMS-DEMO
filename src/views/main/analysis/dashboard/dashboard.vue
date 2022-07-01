<template>
  <div class="dashboard">
    <h2>dashboard</h2>
    <!-- 搜索框 -->
    <div class="search">
      <!-- <el-form label-width="100px">
        <el-row>
          <el-col :span="8"
            ><el-form-item label="账号">
              <el-input placeholder="account" /> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="密码">
              <el-input placeholder="password"> </el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><el-form-item label="你喜欢的运动">
              <el-select>
                <el-option label="篮球" value="shanghai" />
                <el-option label="足球" value="beijing" />
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col
            ><el-form-item label="时间"> <el-input></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form> -->
      <!-- <dd-form v-bind="searchFormConfig" v-model="fuformData"></dd-form> -->
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 表格展示列表数据 -->
      <dd-table :listData="userList" :propList="propList">
        <!-- 通过插槽修改 enable 列的数据，columnDate 作用域插槽接收 enable 列的数据 -->
        <template #enable="columnData">
          <!-- 转换展示 -->
          {{ columnData.row.enable === 1 ? "活跃" : "注销" }}
        </template>
        <!-- 格式化时间展示 -->
        <template #createAt="columnData">
          <span>{{ $filters.formatTime(columnData.row.createAt) }}</span>
        </template>
        <template #updateAt="columnData">
          <span>{{ $filters.formatTime(columnData.row.updateAt) }}</span>
        </template>
      </dd-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import { useMyStore } from "@/store";
import DdTable from "@/base-ui/table/index";

export default defineComponent({
  components: { PageSearch, DdTable },
  name: "dashboard",
  setup() {
    // 收集 dd-form 组件的输入数据
    // const fuformData = ref({
    //   id: "",
    //   name: "",
    //   realname: "",
    //   cellphone: ""
    // });

    // 查询用户列表，调用 vuex action
    const store = useMyStore();
    // 因为是一个通用的页面 action，所以通过 url 来指定具体要发送的请求
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      // 发送该请求，后端接口需要的请求数据
      queryInfo: {
        offset: 0, // 页数
        size: 10 // 每页条数
      }
    });

    // 从 vuex 中获取列表数据，computed 的目的是为了让数据变化后依然能获取到
    const userList = computed(() => store.state.system.userList);
    let totalCount = computed(() => store.state.system.userListCount);

    // 返回的列表数据注册到 el-table-column 中和列对应所需的参数
    const propList = [
      { prop: "name", label: "用户名", minWidth: "100" },
      { prop: "realname", label: "真实姓名", minWidth: "100" },
      { prop: "cellphone", label: "手机号码", minWidth: "100" },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
      {
        prop: "createAt",
        label: "创建时间",
        minWidth: "250",
        slotName: "createAt"
      },
      {
        prop: "updateAt",
        label: "更新时间",
        minWidth: "250",
        slotName: "updateAt"
      }
    ];

    return { searchFormConfig, userList, propList };
  }
});
</script>

<style scoped lang="less">
.dashboard {
  .content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
