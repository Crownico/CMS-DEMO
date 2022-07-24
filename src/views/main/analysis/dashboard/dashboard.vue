<template>
  <div class="dashboard">
    <el-scrollbar>
      <!-- 数字看板 -->
      <div class="count">
        <el-row :gutter="10">
          <template v-for="item in topPanelData" :key="item.amount">
            <el-col :md="12" :lg="6" :xl="6">
              <statistical-panel :panelData="item"></statistical-panel>
            </el-col> </template
        ></el-row>
      </div>
      <!-- 统计图 -->
      <div class="Statistical-chart">
        <el-row :gutter="10">
          <el-col :span="7">
            <dd-card title="分类商品数量(饼图)"> </dd-card>
            <!-- <base-chart></base-chart> -->
          </el-col>
          <el-col :span="10">
            <dd-card title="不同城市商品销量">
              <map-echart :map-data="addressGoodsSale"></map-echart>
            </dd-card>
          </el-col>
          <el-col :span="7">
            <dd-card title="分类商品数量(玫瑰图)"> </dd-card>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="content-row">
          <el-col :span="12">
            <dd-card title="分类商品的销量(折线图)">
              <line-echart v-bind="categoryGoodsSale"></line-echart>
            </dd-card>
          </el-col>
          <el-col :span="12">
            <dd-card title="分类商品的收藏">
              <bar-echart></bar-echart>
            </dd-card>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import DdCard from "@/base-ui/card";
import { BarEchart, LineEchart, MapEchart } from "@/components/page-echarts";
import { useMyStore } from "@/store";
import StatisticalPanel from "@/components/statistical-panel";
export default defineComponent({
  name: "dashboard",
  components: { DdCard, BarEchart, LineEchart, MapEchart, StatisticalPanel },
  setup() {
    const store = useMyStore();
    // 请求数据
    store.dispatch("dashboard/getDashboardDataAction");

    // 获取顶部PanelData
    const topPanelData = computed(() => {
      return store.state.dashboard.topPanelDatas;
    });

    // 折线图：分类商品销量，从 vuex 中读取数据并处理数据
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const values: number[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }
      return { xLabels, values };
    });

    // 地图：各城市销量
    const addressGoodsSale = computed(() => {
      // 获取数据
      const addressGoodsSaleData = store.state.dashboard.addressGoodsSale;
      // 过滤数据，传给 options
      const mapData: any[] = addressGoodsSaleData.map((item: any) => {
        return { name: item.address, value: item.count };
      });
      return mapData;
    });
    return { categoryGoodsSale, addressGoodsSale, topPanelData };
  }
});
</script>

<style scoped lang="less">
.count {
  height: 200px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  .el-row {
    width: 100%;
  }
}
.dashboard {
  // height: 100vh;
  background-color: #f5f5f5;
}
</style>
