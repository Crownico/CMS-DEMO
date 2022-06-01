<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button>hhh</el-button>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-row>
      <el-button size="large">Large</el-button>
      <el-button>Default</el-button>
      <el-button size="small">Small</el-button>
      <el-button size="large" :icon="Search">Search</el-button>
      <el-button :icon="Search">Search</el-button>
      <el-button size="small" :icon="Search">Search</el-button>
    </el-row>
    <el-row class="my-4">
      <el-button size="large" round>Large</el-button>
      <el-button round>Default</el-button>
      <el-button size="small" round>Small</el-button>
      <el-button size="large" :icon="Search" round>Search</el-button>
      <el-button :icon="Search" round>Search</el-button>
      <el-button size="small" :icon="Search" round>Search</el-button>
    </el-row>
    <el-row>
      <el-button :icon="Search" size="large" circle />
      <el-button :icon="Search" circle />
      <el-button :icon="Search" size="small" circle />
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>
<style scoped></style>
