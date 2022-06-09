// 编写好规则
export const rules = {
  num: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur"
    },
    {
      pattern: /0?(13|14|15|17|18)[0-9]{9}/,
      message: "请填写国内手机号码",
      trigger: "blur"
    }
  ],
  code: [
    // {
    //   required: true,
    //   message: "验证码是必传内容~",
    //   trigger: "blur"
    // }
  ]
};
