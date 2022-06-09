<template>
  <div class="login-phone">
    <el-form label-width="80px" :model="phone" :rules="rules">
      <el-form-item label="手机号码" prop="num">
        <el-input type="text" autocomplete="off" v-model="phone.num" />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input type="text" autocomplete="off" v-model="phone.code" />
          <el-button
            type="primary"
            class="btn"
            @click="loginByPhoneNumber"
            v-model="phone.code"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { rules } from "../config/phone-config";
export default defineComponent({
  name: "loginPhone",
  setup() {
    const phone = reactive({
      num: null,
      code: ""
    });

    const loginByPhoneNumber = () => {
      console.log("Logining");
    };

    return {
      phone,
      rules,
      loginByPhoneNumber
    };
  }
});
</script>

<style scoped lang="less">
.verify-code {
  display: flex;
  .btn {
    margin-left: 3px;
  }
}
.login-phone {
  margin-right: 10px;
}
</style>
