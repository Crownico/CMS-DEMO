<template>
  <div class="line-echart">
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script setup lang="ts">
import BaseChart from "@/base-ui/chart";
import { defineProps, computed } from "vue";

const props = defineProps<{
  xLabels: string[]; // x 轴数据蕾姆
  values: number[]; // 数据值
}>();

const options = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "分类销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series"
        },
        data: props.values
      }
    ]
  };
});
</script>

<style scoped></style>
