<template>
  <div class="base-chart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { EChartsOption } from "echarts";
import { withDefaults, defineProps, ref, onMounted, watchEffect } from "vue";
import { useECharts } from "./hooks/useECharts";

// 定义 props
const props = withDefaults(
  defineProps<{
    options: EChartsOption; // 图表配置 options
    width?: string; // 容器宽高也有外部通过 props 指定
    height?: string;
  }>(),
  {
    width: "100%",
    height: "360px"
  }
);

const echartDivRef = ref();

onMounted(() => {
  // 调用 hook 配置 ECharts
  const { setOptions } = useECharts(echartDivRef.value);

  // 监听 options 的变化获取最新的变化配置图表
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style lang="less" scoped></style>
