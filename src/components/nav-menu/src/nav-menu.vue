<template>
  <div class="nav-menu">
    <!-- 给侧栏添加标题，logo -->
    <div class="logo">
      <!-- 注意：在 template 中使用 webpack 定义的别名要以 ~ 开头 -->
      <img src="~@/assets/img/logo.svg" alt="" class="img" />
      <span v-if="!isCollapse">CMS-DEMO</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      :collapse="isCollapse"
      default-active="2"
      collapse-transition
      background-color="#0c2135"
      text-color="#b7bdc3"
    >
      <!-- 在 template 中循环取出 userMenus 的数据进行渲染 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 判断是否是一级菜单 -->
        <template v-if="!item.children">
          <el-menu-item :index="+item.id">
            <!-- <el-icon>
              <icon-menu />
            </el-icon> -->
            <el-icon>
              <Menu />
            </el-icon>

            <span> {{ item.name }}</span>
          </el-menu-item>
        </template>

        <!-- 判断是否是二级菜单 -->
        <template v-else>
          <el-sub-menu :index="'' + item.id">
            <template #title>
              <el-icon :class="!isCollapse ? 'el-icon' : 'el-icon-coll-true'">
                <Camera />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template
              v-for="itemChildren in item.children"
              :key="itemChildren.id"
            >
              <!-- 二级菜单中的菜单是否是一级菜单 -->
              <template v-if="!itemChildren.children">
                <el-menu-item :index="'' + itemChildren.id">
                  <el-icon>
                    <Menu />
                  </el-icon>
                  <span> {{ itemChildren.name }}</span>
                </el-menu-item>
              </template>

              <!-- 二级菜单中是否是二级菜单 -->
              <template v-else>
                <el-sub-menu :index="itemChildren.id + ''">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>{{ itemChildren.name }}</span>
                  </template>

                  <template
                    v-for="itemGrandChildren in itemChildren.children"
                    :key="itemGrandChildren.id"
                  >
                    <!-- 假设没有第四级菜单 -->
                    <el-menu-item :index="itemGrandChildren.id + ''">
                      <el-icon>
                        <Menu />
                      </el-icon>
                      <span> {{ itemGrandChildren.name }}</span>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useMyStore } from "@/store";
import { computed, defineComponent, defineProps } from "vue";

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useMyStore();
    const userMenus = computed(() => store.state.login.userMenus);
    // const props = defineProps({
    //   collapse: {
    //     type: Boolean,
    //     default: false
    //   }
    // });
    // const isCollapse = props.collapse;
    // console.log(isCollapse);

    return {
      userMenus
    };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  color: white;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  v-deep .el-sub-menu__title {
    color: white;
  }
  .el-menu {
    border-right: none;
    // background-color: #001529;
  }
  // 目录
  .el-sub-menu {
    // background-color: #001529;
    color: white;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      // background-color: #0c2135 !important;
      color: white !important;
    }
  }
  ::v-deep .el-sub-menu__title {
    // background-color: #001529 !important;
    color: white;
    // justify-content: space-around;
    span {
      margin-left: 20px;
    }
  }
  ::v-deep .el-sub-menu__title:hover {
    color: black;
    background-color: #eeeae8 !important;
  }
  ::v-deep span {
    // margin-right: 45px;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: black !important; // 菜单
    background-color: #eeeae8 !important;
  }

  .el-menu-item.is-active {
    color: black !important;
    background-color: #fff !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
.el-icon-coll-true {
  // margin-left: 37px !important;
}
</style>
