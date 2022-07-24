<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip
        class="box-item"
        effect="light"
        :content="panelData.tips"
        placement="top"
      >
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <dd-count-up
        :options="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
        :endVal="panelData.number1"
      ></dd-count-up>
    </div>
    <div class="footer">
      <span>{{ panelData.subtitle }}</span>
      <dd-count-up
        :options="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
        :endVal="panelData.number2"
      ></dd-count-up>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DdCountUp from "@/base-ui/count-up";
import { IPanelData } from "./type";

export default defineComponent({
  components: {
    DdCountUp
  },
  props: {
    panelData: {
      type: Object as PropType<IPanelData>,
      required: true
    }
  },
  setup() {
    // countUp 的配置
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: "" // 单位
    };
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: "￥" // 单位
    };
    return { counterOption1, counterOption2 };
  }
});
</script>

<style scoped lang="less">
.statistical-panel {
  margin-top: 5px;
  display: flex;
  flex-flow: column;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  padding: 0 20px;
  background-color: white;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: rgba(0, 0, 0, 0.45);
  }
  .content {
    font-size: 3em;
    font-weight: 200;
  }
  .footer {
    display: flex;
    color: rgba(0, 0, 0, 0.65);
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
    div {
      margin-left: 6px;
    }
  }
}
</style>
