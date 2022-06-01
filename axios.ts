// import axios from "axios";
const axios = require("axios");

// axios({
//   method: "post",
//   url: "http://localhost/post",
//   data: {
//     name: "ls",
//     age: 43
//   }
// }).then((res) => {
//   console.log(res.data);
// });

// axios.get("http://localhost/get").then((res) => console.log(res));

axios
  // 多个请求放在数组中
  .all([axios.get("http://localhost/get"), axios.post("http://localhost/post")])
  // 返回结果也是在数组中
  .then((res) => {
    console.log(res[0].data);
    console.log(res[1].data);
  })
  .catch((err) => {
    console.log("failure");
  });
 