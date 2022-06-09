<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="login-tabs" stretch v-model="currentTab">
      <el-tab-pane name="accountTab">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <User />
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phoneTab">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <Iphone />
            </el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="iskeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div>
      <el-button type="primary" class="loginBtn" @click="loginBtn"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User, Iphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

export default defineComponent({
  name: "login-panel",
  components: { User, Iphone, LoginAccount, LoginPhone },
  setup() {
    // 获取记住密码是否勾选
    const iskeepPassword = ref<boolean>(true); // ref 会根据传入的内容进行类型推导
    // 当前选中 tab 页
    const currentTab = ref<string>("accountTab");

    // 拿到子组件的实例对象
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();

    // 点击登录按钮的操作
    const loginBtn = () => {
      console.log("启动子组件的登录逻辑");

      // 根据当前登录面板，启动不同登录逻辑
      switch (currentTab.value) {
        case "accountTab":
          // 调用账号密码登录方法
          accountRef.value?.loginByAccount(iskeepPassword.value); // 传入是否勾选记住密码结果
          break;
        case "phoneTab":
          // 调用手机登录的方法
          phoneRef.value?.loginByPhoneNumber();
          break;
        default:
          break;
      }
    };
    return {
      iskeepPassword,
      loginBtn,
      accountRef,
      currentTab,
      phoneRef
    };
  }
});
</script>

<style scoped lang="less">
.title {
  text-align: center;
}
.login-panel {
  margin-top: 200px;
  width: 320px;
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .loginBtn {
    width: 100%;
    margin-top: 4px;
  }
  .custom-tabs-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    .el-icon {
      margin-right: 2px;
    }
  }
}
</style>
