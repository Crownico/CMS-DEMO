<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "normalize.css";
import "@/assets/css/index.css";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
