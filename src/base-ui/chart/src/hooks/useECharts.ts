import * as echarts from "echarts";
// import ChinaMapData from "../data/chinaMapData.json";
import ChinaMapData from "../data/china.json";

// 注册中国地图
echarts.registerMap("china", ChinaMapData);

export function useECharts(dom: HTMLDivElement) {
  // 初始化 echarts 实例，并配置 option
  const echartsInstance = echarts.init(dom);
  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options);
  };

  // 设置图表自动根据浏览器宽度进行缩放，监听浏览器宽度调用 echarts 实例的 resize 方法进行缩放
  window.addEventListener("resize", () => {
    echartsInstance.resize();
  });
  // 有些情况浏览器宽度没变，但是图表也需要缩放，比如菜单栏的展开和收起
  // 所以我们可以封装一个缩放图表的函数，供外部手动控制缩放
  const resizeEChart = () => {
    echartsInstance.resize();
  };

  // 为什么不用元组类型返回，因为不是每一个属性都会用到，对象更灵活一点
  return {
    echartsInstance,
    setOptions,
    resizeEChart
  };
}
