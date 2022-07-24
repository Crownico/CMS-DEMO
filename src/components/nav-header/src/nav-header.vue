<template>
  <div class="nav-header">
    <!-- 折叠侧栏的开关按钮 -->
    <div class="switch">
      <!-- <el-button type="primary" icon="el-icon-menu" @click="collapse"></el-button> -->
      <el-icon @click="collapse" size="25px" v-if="isCollapse">
        <Expand />
      </el-icon>
      <el-icon v-else size="25px" @click="collapse">
        <Fold />
      </el-icon>
    </div>

    <div class="content">
      <!-- 面包屑 -->
      <dd-breadcrumb :breadcrumbs="breadcrumbs"></dd-breadcrumb>

      <!-- 右侧导航栏 -->
      <div class="right-nav-bar">
        <!-- 用户信息 -->
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import DdBreadcrumb from "@/base-ui/breadcrumb";
import { useMyStore } from "@/store";
import { useRoute } from "vue-router";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import UserInfo from "./user-info.vue";

export default defineComponent({
  name: "navHeader",
  components: {
    DdBreadcrumb,
    UserInfo
  },
  setup(props, { emit }) {
    // defineEmits 只能用在 <script setup> 中
    // const emit = defineEmits(["isFold"]);
    const isCollapse = ref(false);
    const collapse = () => {
      isCollapse.value = !isCollapse.value;
      // console.log("send 父" + isCollapse.value);

      emit("isFold", isCollapse.value);
    };

    const store = useMyStore();
    const userMenus = store.state.login.userMenus;
    // 面包屑数据
    const breadcrumbs = computed(() => {
      // 为什么将 route，放到计算属性中？因为面包屑要跟着当前路由对象的变化而拿到最新的数据进行变化
      const route = useRoute();
      return pathMapBreadcrumbs(userMenus, route.path);
    });

    return {
      collapse,
      isCollapse,
      breadcrumbs
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  height: 2em;
  width: 100%;
  align-items: center;

  .content {
    display: flex;
    flex: 1; // 表示占据整个盒子
    align-items: center;
    justify-content: space-between;

    :deep(.nav-breadcrumb) {
      margin-left: 1em;
    }
  }

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}

.right-nav-bar {
  display: flex;
  align-items: center;
}
</style>
