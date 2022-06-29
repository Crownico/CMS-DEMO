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
      <el-table :data="userList" border style="width: 100%">
        <!-- prop 对应了数据对象的 key， label 表示表头-->
        <el-table-column prop="name" label="姓名" min-width="180" />
        <el-table-column prop="realname" label="真实姓名" min-width="180" />
        <el-table-column prop="cellphone" label="电话号码" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { searchFormConfig } from "./config/search.config";
import PageSearch from "@/components/page-search/index";
import { useMyStore } from "@/store";

export default defineComponent({
  components: { PageSearch },
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

    // 从 vuex 中获取列表数据
    const userList = computed(() => store.state.system.userList);
    let totalCount = computed(() => store.state.system.userListCount);

    return { searchFormConfig, userList };
  }
});
</script>

<style scoped></style>
