<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

import ddrequest1 from "@/service";

type returnDataType = {
  data: any;
  returnCode: string;
  success: boolean;
};

ddrequest1
  .get<returnDataType>({
    url: "/home/multidata"
    // method: "get"
    // showLoading: false
    // interceptors: {
    //   requestInterceptor(config) {
    //     console.log("request 方法请求拦截成功");
    //     console.log("------------");
    //     return config;
    //   },
    //   responseInterceptor(res) {
    //     console.log("------------");
    //     console.log("request 方法响应拦截成功");
    //     return res.data;
    //   }
    // }
  })
  .then((res) => {
    console.log("get ---------");

    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld
  }
});
</script>
