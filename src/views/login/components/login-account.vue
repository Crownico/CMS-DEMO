<template>
  <div class="login-account">
    <el-form label-width="80px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input type="text" autocomplete="off" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          v-model="account.password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { rules } from "../config/account-config";
import localCache from "@/utils/cache";
import { useStore } from "vuex";

export default defineComponent({
  name: "loginAccount",
  setup() {
    const store = useStore();

    // 输入框的账号密码，因为两者太紧密了，所以定义成一个对象保存
    const account = reactive({
      // 默认从缓存中获取账号密码，如果没有则为空
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? ""
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginByAccount = (iskeepPassword: boolean) => {
      // 1. 判断表单验证结果是否执行登录逻辑
      formRef.value?.validate((valid) => {
        if (valid) {
          // 2. 判断是否勾选记住密码
          if (iskeepPassword) {
            // 2.1 将账号密码缓存
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            // 2.1 删除缓存
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          // 3. 真正的登录请求
          store.dispatch("login/acountLoginRequestAction", { ...account });
        }
      });
    };
    return {
      account,
      rules,
      loginByAccount,
      formRef
    };
  }
});
</script>

<style scoped>
.login-account {
  margin-right: 10px;
}
</style>
