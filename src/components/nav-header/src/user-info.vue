<template>
  <div class="user-info">
    <!-- 用户头像 -->
    <el-avatar
      :size="38"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <!-- 用户下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人管理</el-dropdown-item>
          <el-dropdown-item> 系统管理 </el-dropdown-item>
          <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useMyStore } from "@/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useMyStore();
    const router = useRouter();
    // 用户名回显
    const userName = store.state.login.userInfo.name;
    // 退出登录
    const loginOut = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return { userName, loginOut };
  }
});
</script>

<style scoped lang="less">
.user-info {
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
