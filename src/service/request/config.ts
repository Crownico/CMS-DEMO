let BASE_URL = "";

switch (process.env.NODE_ENV) {
  case "development":
    // BASE_URL = "http://ahcheng.top/dev";
    BASE_URL = "http://123.207.32.32:8000";
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
