<template>
  <div class="nav-header">
    <!-- 折叠侧栏的开关按钮 -->
    <!-- <el-button type="primary" icon="el-icon-menu" @click="collapse"></el-button> -->
    <el-icon @click="collapse" size="25px" v-if="isCollapse">
      <Expand />
    </el-icon>
    <el-icon v-else size="25px" @click="collapse">
      <Fold />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "navHeader",
  setup(props, { emit }) {
    // defineEmits 只能用在 <script setup> 中
    // const emit = defineEmits(["isFold"]);
    const isCollapse = ref(false);
    const collapse = () => {
      isCollapse.value = !isCollapse.value;
      // console.log("send 父" + isCollapse.value);

      emit("isFold", isCollapse.value);
    };
    return {
      collapse,
      isCollapse
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
