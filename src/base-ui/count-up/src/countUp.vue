<template>
  <div>
    <!-- 数据容器 -->
    <span ref="countUpRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { CountUp, CountUpOptions } from "countup.js";

export default defineComponent({
  props: {
    endVal: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 获取 dom
    const countUpRef = ref<HTMLSpanElement>();
    // countUp 实例
    const instance = ref<CountUp>();
    // 默认配置
    const defaultOptions: CountUpOptions = {
      decimalPlaces: 2, // 保留两位
      duration: 2, // 动画时长
      separator: ",", // 千位分割
      decimal: ".", // 小数分割
      prefix: "￥" // 单位
    };

    // 获取 dom 必须等到 dom 挂载后才能拿到值
    onMounted(() => {
      countUpFn();
    });

    // 用函数包裹一下，免得一堆代码洒在 onMounted 中
    const countUpFn = () => {
      // 将 props 中的具体配置项添加到配置对象中，Object.assign 浅拷贝
      const countUpOptions: CountUpOptions = Object.assign(
        defaultOptions,
        props.options
      );
      // 类型缩小排除dom undefined
      if (!countUpRef.value) return;
      // 获取 countUp 实例
      instance.value = new CountUp(
        countUpRef.value,
        props.endVal,
        countUpOptions
      );
      // 启动数字增长效果
      start();
    };
    // 启动函数
    const start = () => {
      if (!instance.value) return;
      instance?.value.start();
    };
    // updata 更新结束值
    const update = (number: number) => {
      if (!instance.value) return;
      instance?.value.update(number);
    };

    // 监听 props 传进来的结束值是否变化
    watch(
      () => props.endVal, // 注意：这里要转成函数形式
      () => {
        update(props.endVal);
      }
    );
    return { countUpRef };
  }
});
</script>

<style scoped></style>
