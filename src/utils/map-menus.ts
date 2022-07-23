import { IBreadcrumb } from "@/base-ui/breadcrumb/type/type";
import { RouteRecordRaw } from "vue-router";

// path 和 url 的匹配函数
// export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
//   // 创建路由记录数组，后续会将数组里的路由作为首页 /mian 的子路由注册
//   const routes: RouteRecordRaw[] = [];

//   // 1. 加载所有路由模块
//   const allRoutes: RouteRecordRaw[] = [];
//   // 1.1 获取所有定义了路由的文件
//   const routeFIle = require.context("@/router/main", true, /\.ts$/);
//   // 1.2 通过路由文件获取到文件相对路径，然后拼接出文件路径，将所有文件加载为模块
//   routeFIle.keys().forEach((fileRelativePath) => {
//     // console.log(fileRelativePath); // ./analysis/dashboard/dashboard.ts ...等
//     // 去掉 . 拼接出路径，以 CommonJS 加载为模块
//     const route = require(`../router/main${fileRelativePath.split(".")[1]}`);
//     // 从模块中取出导出对象——路由记录
//     allRoutes.push(route.default);
//   });

//   // 2. 获取菜单中的 url
//   // 定义递归函数，用于获取菜单中的 url
//   // 转移方程：如果url为空，则获取父级的url，直到url不为空

//   const urlArr: string[] = [];
//   const getUrl = (menus: any, length: number) => {
//     for (const menu of menus) {
//       if (!menu || !menu.url) continue;
//       // const tempUrl: string[] = [];
//       // 如果存在 url 则直接添加
//       // console.log("---menu----");
//       // console.log(menu);
//       // let length = menu.children?.length ?? 0;
//       let len;
//       if (menu.url && (!menu.children || menu.children.length === 0)) {
//         // console.log(`存入的url${menu.url}`);
//         urlArr.push(menu.url);
//         len -= 1;
//         // console.log(length);
//         if (len == 0) {
//           getUrl(menu, len + 1);
//         }
//       } else if (menu.children[0].url) {
//         if (menu.children) len = menu.children.length;

//         // console.log(`lenth: ${len}`);
//         // console.log("--------menu.children--------");
//         // console.log(menu.children);

//         getUrl(menu?.children, len);
//       } else {
//         urlArr.push(menu.url);
//       }
//     }
//   };
//   getUrl(userMenus, userMenus.length);

//   // const _recurseGetRoute = (menus: any[]) => {
//   //   for (const menu of menus) {
//   //     if (menu.type === 2) {
//   //       const route = allRoutes.find((route) => route.path === menu.url);
//   //       if (route) routes.push(route);
//   //     } else {
//   //       _recurseGetRoute(menu.children);
//   //     }
//   //   }
//   // };

//   // _recurseGetRoute(userMenus);

//   // 3. 将菜单中的 url 和路由模块匹配
//   // console.log(allRoutes);
//   // console.log(urlArr);
//   allRoutes.forEach((route) => {
//     // console.log(route.default.path);
//     if (urlArr.includes(route.path)) {
//       // console.log(route);

//       routes.push(route);
//     }
//   });
//   // console.log("------");

//   // console.log(routes);
//   return routes;
// }

let firstMenu: any = null;

// 动态路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        // 保存第一个 url，方便后续重定向
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

export { firstMenu };

// 面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

// 通过当前页面路径从所有菜单数据中匹配出当前页面完整的菜单数据
// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 第一层级都是下拉菜单，所以跳过不匹配，我们要匹配的是第二层级的菜单数据
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

// 获取账号所有权限，也就是获取所有 children 字段下的 url
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

// 获取菜单树的叶子节点菜单的 id
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);

  return leftKeys;
}
