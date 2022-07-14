<template>
  <div class="dd-form">
    <!-- 标题插槽 -->
    <div class="header">
      <slot name="header">
        <!-- <h2>标题</h2> -->
      </slot>
    </div>
    <el-form :label-width="labelWidth">
      <!-- 判断栅格布局样式 -->
      <el-row>
        <!-- 从配置信息中遍历取出表单项 -->
        <template v-for="formItem in formItems" :key="formItem.label">
          <!-- 给每个表单项添加栅格布局 -->
          <el-col v-bind="colLayout"
            ><!-- 渲染表单项：判断类型并处理样式规则等进行渲染表单项 -->
            <el-form-item
              :label="formItem.label"
              v-if="!formItem.isHidden"
              :rules="formItem.rules"
              :style="itemStyle"
            >
              <!-- 类型为 input 或者 password -->
              <!-- 因为 element-plus 给这两个类型提供的组件都是 el-input，并且提供了input 和 password 类型的切换开关 -->
              <!-- 所以能将这两个判断写在一起，并通过 show-password 开关转换类型 -->
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <!-- 如果 type 为 password，则 show-password 为 true -->
                <el-input
                  :show-password="formItem.type === 'password'"
                  :placeholder="formItem.placeholder"
                  v-bind="formItem.otherOptions"
                  v-model="formData[`${formItem.field}`]"
                ></el-input>
              </template>
              <!-- 类型为下拉框 -->
              <template v-else-if="formItem.type === 'select'"
                ><el-select
                  v-bind="formItem.otherOptions"
                  :placeholder="formItem.placeholder"
                  v-model="formData[`${formItem.field}`]"
                >
                  <!-- 遍历下拉框的下拉值 -->
                  <el-option
                    v-for="option in formItem.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option></el-select
              ></template>
              <!-- 类型为日期选择器 -->
              <template v-else-if="formItem.type === 'datepicker'">
                <!-- 日期选择存在一些特殊属性 -->
                <el-date-picker
                  v-bind="formItem.otherOptions"
                  v-model="formData[`${formItem.field}`]"
                ></el-date-picker>
              </template> </el-form-item
          ></el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 按钮插槽 -->
    <div class="footer">
      <slot name="footer">
        <!-- <h1>搜索按钮</h1> -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "../type/";

export default defineComponent({
  name: "DdForm",
  // 作为“子组件”需要接收的配置信息
  props: {
    // title: {
    //   type: String,
    //   default: "标题"
    // },
    // 接收页面组件传递的自定义变量获取表单输入数据（用户输入框的输入是到了父组件 page-content 中）
    // formData: {
    //   type: Object,
    //   required: true
    // },
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      // 通过断言对数组类型进一步的检验
      type: Array as PropType<IFormItem[]>,
      default: () => [] // 引用类型数组和对象，默认值必须使用箭头函数
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px", "text-align": "justify" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ["update:modelValue"], // 定义自定义事件
  setup(props, { emit }) {
    // 定义变量 formData 在子组件中进行双向数据流
    // const formData = computed({
    //   get: () => props.modelValue, // 获取父组件传入的数据
    //   set: (newValue) => {
    //     console.log("set 不会被执行");
    //     // 触发自定义事件，传出最新数据
    //     emit("update:modelValue", newValue);
    //   }
    // });

    // 转存 modelValue 并响应式处理
    const formData = ref({ ...props.modelValue });

    // 监听副本的变化，并且触发 update:modelValue 事件
    watch(
      formData, // 监听副本
      (newValue) => {
        console.log(newValue);
        emit("update:modelValue", newValue); // 触发 update 事件
      },
      {
        deep: true // 开启深度监听
      }
    );

    return { formData };
  }
});
</script>

<style scoped lang="less">
.dd-form {
  display: flex;
  flex-flow: column nowrap;
  .header {
    display: flex;
    justify-content: flex-start;
    padding-left: 2em;
  }
  .footer {
    display: flex;
    justify-content: end;
    padding: 0 4em 2em 0;
  }
}
</style>
