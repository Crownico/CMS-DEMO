<template>
  <div class="main">
    <!-- 布局容器 -->
    <div class="common-layout main-content">
      <el-container>
        <!-- 侧栏菜单 -->
        <div class="aside">
          <!-- 根据折叠情况设置侧栏宽度 -->
          <el-aside :width="collapse ? '64px' : '200px'">
            <!-- 将折叠信息传递给 aside -->
            <nav-menu :isCollapse="collapse"></nav-menu>
          </el-aside>
        </div>

        <el-container class="page">
          <!-- header -->
          <el-header class="page-header">
            <Nav-header @isFold="isFold"></Nav-header>
          </el-header>
          <!-- main -->
          <el-main class="page-content">
            <!-- 给 main 区域设个背景 -->
            <div class="page-info">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import NavHeader from "@/components/nav-header";
import NavMenu from "@/components/nav-menu";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { NavMenu, NavHeader },
  name: "mainManage",
  setup() {
    const collapse = ref(false);
    // 获取子组件 nav-header 传递的值
    const isFold = (isCollapse: boolean) => {
      // console.log("父接收：" + isCollapse);

      collapse.value = isCollapse;
    };
    return { collapse, isFold };
  }
});
</script>

<!-- <style lang="less">
.common-layout {
  height: 100%;
}
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.aside {
  height: 100vh;
  background-color: hsla(209, 64%, 13%, 0.95);
}

.main-content {
  .page {
    height: 100%;
  }
}

.page-content {
  height: calc(100% - 48px);
  .page-info {
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #edf3f8;
  transition: width 0.3s linear;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style> -->

<style lang="less" scoped>
.aside {
  height: 100vh;
  background-color: hsla(209, 64%, 13%, 0.95);
}

:deep(.page-header) {
  height: 50px;
  display: flex;
  align-items: center;
}

.page-content {
  // color: #333;
  text-align: center;
  padding: 0;
  border: 20px solid #f0f2f5;
  // background-color: #f0f2f5;
}
</style>
