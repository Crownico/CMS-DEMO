const express = require("express");

const app = express();

app.get("/get", (req, res) => {
  res.send({
    name: "zs",
    age: 23
  });
});

app.post("/post", (req, res) => {
  throw 'hhh';
});

app.listen(80, () => {
  console.log("服务启动");
});
