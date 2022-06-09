let BASE_URL = "";

switch (process.env.NODE_ENV) {
  case "development":
    // BASE_URL = "http://ahcheng.top/dev";  /home/multidata
    // BASE_URL = "http://192.168.139.1:8080"; // http://123.207.32.32:8000
    BASE_URL = "/api";
    break;
  case "production":
    BASE_URL = "http://ahcheng.top/prod";
    break;
  case "test":
    BASE_URL = "http://ahcheng.top/test";
    break;
  default:
    break;
}

export { BASE_URL };
