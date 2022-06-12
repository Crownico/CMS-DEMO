import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminLogin from "@/views/login/admin-login.vue";
import localCache from "@/utils/cache";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main-manage.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    // 如果想要进入其他页面，判断是否有 token
    const token = localCache.getCache("token");
    // console.log(token);
    // console.log(!token);

    if (!token) {
      console.log("登录失效，请重新登录");

      return "/login"; // 没有 token，说明没登录，放行进入登录页面
    }
    // return "/main"; // 已经登录就转发到首页，不让进登录页。
  }
});

export default router;
