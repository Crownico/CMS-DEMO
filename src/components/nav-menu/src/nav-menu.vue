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
          <el-menu-item :index="+item.id" @click="handleClick(item)">
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
              <!-- <i :class="item.icon"></i> -->
              <!-- <div ref="icon1" icon="123"> -->
              <el-icon>
                <component :is="icon(item.icon)" />

                <!-- <component :is="`Menu`"></component> -->
              </el-icon>
              <!-- </div> -->

              <span>{{ item.name }}</span>
            </template>

            <template
              v-for="itemChildren in item.children"
              :key="itemChildren.id"
            >
              <!-- 二级菜单中的菜单是否是一级菜单 -->
              <template v-if="!itemChildren.children">
                <el-menu-item
                  :index="'' + itemChildren.id"
                  @click="handleClick(itemChildren)"
                >
                  <!-- <el-icon>
                    <Menu />
                  </el-icon> -->
                  <span> {{ itemChildren.name }}</span>
                </el-menu-item>
              </template>

              <!-- 二级菜单中是否是二级菜单 -->
              <template v-else>
                <el-sub-menu :index="itemChildren.id + ''">
                  <template #title>
                    <!-- <el-icon>
                      <location />
                    </el-icon> -->
                    <span>{{ itemChildren.name }}</span>
                  </template>

                  <template
                    v-for="itemGrandChildren in itemChildren.children"
                    :key="itemGrandChildren.id"
                  >
                    <!-- 假设没有第四级菜单 -->
                    <el-menu-item
                      :index="itemGrandChildren.id + ''"
                      @click="handleClick(itemGrandChildren)"
                    >
                      <!-- <el-icon>
                        <Menu />
                      </el-icon> -->
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
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

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
    // const icon1: any = ref();
    // watchEffect(() => {
    //   console.log(icon1.value);
    // });

    // 一级菜单图标组件
    const icon = (iconStr: string) => {
      // 裁剪数组去掉 el-icon 前缀
      const iconStrArr = iconStr.split("-").slice(2);
      // 将 iconStrArr 数组元素每个首字母大写
      const temp = iconStrArr.map((item: string) => {
        return item.replace(/^\w/, (c: string) => c.toUpperCase());
      });
      // 将 temp 数组元素拼接成字符串
      return temp.join("");
    };

    const router = useRouter();
    // 点击菜单路由跳转
    const handleClick = (item: any) => {
      router.push(item.url ?? "/not-found");
      // console.log(item.url);
      // 老师的数据只有两级菜单，并且没有第三级的 url 为 null
      // 所以点击第三级进行路由跳转的时候item.url为 null，所以不能跳转到组件
      // 难怪我渲染菜单层级和获取菜单 url 这么难，原来接口的菜单数据不是我现在看到的样子。。
      // router.push(item.url);
    };
    return {
      userMenus,
      icon,
      handleClick
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
      // padding-left: 50px !important;
      // background-color: #0c2135 !important;
      justify-content: center;
      padding-right: 40px;
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
