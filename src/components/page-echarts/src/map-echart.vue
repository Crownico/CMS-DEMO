<template>
  <div class="map-echart">
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script setup lang="ts">
import BaseChart from "@/base-ui/chart";
import { defineProps, computed } from "vue";
// 城市匹配对应的经纬度数据
import { convertData } from "../utils/covent-data";

interface IMapData {
  name: string;
  value: number;
}

const props = defineProps<{
  mapData: IMapData[]; // 地图数据
}>();

console.log(convertData(props.mapData));

const options = computed(() => {
  return {
    backgroundColor: "#fff",
    title: {
      text: "全国销量统计",
      left: "center",
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return params.name + " : " + params.value[2];
      }
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ["高", "低"],
      inRange: {
        color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"]
      },
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      // 地理坐标系，让地图全是“点”
      map: "china",
      roam: "scale",
      emphasis: {
        areaColor: "#f4cccc",
        borderColor: "rgb(9, 54, 95)",
        itemStyle: {
          areaColor: "#f4cccc"
        }
      }
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo", // 坐标系统
        // data 接收的数据格式为：data: [{name: 城市名, value: [经纬度, 业务数据]}]
        data: convertData(props.mapData), // 调用工具函数将匹配转换好的数据传入
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1
          }
        }
      },
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  };
});
</script>

<style scoped></style>
