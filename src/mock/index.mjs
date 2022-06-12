import Mock from "mockjs";

let name = Mock.Random.cname();
let roleId;
const supAdminLogin = Mock.mock({
  status: 200,
  msg: "登录成功",
  data: {
    id: Mock.Random.id().slice(-5),
    name: name,
    token: "@guid()"
  }
});
const lowAdminLogin = Mock.mock({
  status: 200,
  msg: "登录成功",
  data: {
    id: "@id()",
    name: name,
    token: "@guid()"
  }
});
Mock.mock("/adminLogin", "post", (options) => {
  // 通过密码来区分用户角色
  console.log(options);
  console.log(`password: ${+JSON.parse(options.body).password}`);
  const password = +JSON.parse(options.body).password;
  switch (password) {
    case 123456: // 超级管理员
      roleId = 1;
      return supAdminLogin;
    case 654321: // 一般管理员
      roleId = 2;
      return lowAdminLogin;
    default:
      return {
        status: 200,
        msg: "密码错误",
        data: { token: null }
      };
  }
});

// 为了避免拦截的路径写死，导致和带上参数的url不匹配
// 可以用正则匹配，只要拦截的url包含了请求的url除参数外的部分，就拦截
// Mock.mock("/userInfo?userId=1", "get", (options) => {
Mock.mock(/userInfo/, "get", (options) => {
  console.log(options.url);
  return Mock.mock({
    status: 200,
    msg: "获取登录用户信息成功",
    data: {
      name: name,
      "age|17-35": 18,
      address: Mock.Random.county(true),
      roleId: roleId
    }
  });
});

Mock.mock(/userMenus/, "get", (options) => {
  // 从 url 中拿到 roleid
  const roleId = options.url.slice(-1);
  console.log(roleId);
  // 不同角色的菜单数据
  let userMenuByRoleId;
  switch (+roleId) {
    case 1:
      console.log("超级管理员菜单");
      userMenuByRoleId = {
        name: Mock.Random.cname(),
        address: Mock.Random.county(true)
      };
      break;
    case 2:
      console.log("一般管理员菜单");
      userMenuByRoleId = {
        name: Mock.Random.cname(),
        address: Mock.Random.county(true)
      };
      break;
    default:
      break;
  }
  return Mock.mock({
    status: 200,
    msg: "获取登录用户菜单成功",
    data: userMenuByRoleId
  });
});
