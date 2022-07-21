let BASE_URL = "";

// 自动根据环境切换 BASE_URL
switch (process.env.NODE_ENV) {
  case "development":
    // BASE_URL = "http://ahcheng.top/dev";  /home/multidata
    // BASE_URL = "http://192.168.139.1:8080"; // http://123.207.32.32:8000
    // BASE_URL = "/api";
    BASE_URL = "http://152.136.185.210:4000";
    break;
  case "production":
    // BASE_URL = "http://ahcheng.top/prod";
    BASE_URL = "http://152.136.185.210:4000";
    break;
  case "test":
    // BASE_URL = "http://ahcheng.top/test";
    BASE_URL = "http://152.136.185.210:4000";
    break;
  default:
    break;
}

export { BASE_URL };
