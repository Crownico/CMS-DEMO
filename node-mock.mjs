import express from "express";
// const express = require("express");

const app = express();

// 让 post 请求发送过来的 json 数据能通过 req.body 获取
app.use(express.json());
// post 键值对数据，能通过 req.body 获取
// app.use(express.urlencoded({ extended: true }));

let token;

app.get("/userInfo", (req, res) => {
  console.log(req.url, req.query);
  // token 授权
  if (+req.headers.authorization == token) {
    switch (
      +req.query.userId // + 运算符将字符串转成数字
    ) {
      case 1:
        res.send({ name: "zs", age: 18, roleId: 101 });
        break;
      case 2:
        res.send({ name: "ls", age: 44, roleId: 102 });
        break;
      default:
        break;
    }
  }
});

// 校验登录
app.post("/login", (req, res) => {
  token = Math.random() * 100000;
  console.log(req.url, req.body);
  const { name, password } = req.body;
  if (name == "ahcheng" && password == 123456) {
    res.send({
      id: 1,
      name: "ahcheng",
      token: token
    });
  } else {
    res.send("账户或密码错误");
  }
});

app.get("/userMenus", (req, res) => {
  if (+req.headers.authorization == token) {
    switch (
      +req.query.roleId // + 运算符将字符串转成数字
    ) {
      case 101:
        console.log("普通用户登录");
        res.send({ dataManage: "数据管理" });
        break;
      case 102:
        console.log("管理员登录");
        res.send({ dataManage: "数据管理", systemManage: "系统管理" });
        break;
      default:
        break;
    }
  }
});
// 主机名必须是当前电脑上存在的 ip 地址，比如 localhost 和 本机 ip
app.listen(8080, "192.168.139.1", () => {
  console.log("服务启动");
});
