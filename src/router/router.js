import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/store/auth-store";

let authStore;
const routes = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { title: "首页" },
    component: () => import("@/views/home/HomePage.vue"),
    children: [
      {
        path: "device",
        name: "device",
        meta: { title: "设备列表", transition: "moveUp" },
        component: () => import("@/views/device/DeviceList.vue"),
      },
      {
        path: "report",
        name: "report",
        meta: { title: "数据报表", transition: "moveUp" },
        component: () => import("@/views/report/Report.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    meta: { title: "系统管理" },
    redirect: "/settings/users",
    component: () => import("@/views/system/Settings.vue"),
    children: [
      {
        path: "users",
        name: "users",
        meta: { title: "用户管理" },
        component: () => import("@/views/system/UserList.vue"),
      },
      {
        path: "roles",
        name: "roles",
        meta: { title: "角色管理" },
        component: () => import("@/views/system/RoleList.vue"),
      },
    ],
  },
  {
    path: "/cctv",
    name: "cctv",
    meta: { title: "视频监控" },
    component: () => import("@/views/cctv/CctvMgt.vue"),
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: routes, // short for `routes: routes`
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.path != "/login" && authStore.isLogin()) {
    return "/login";
  }
});

export default router;
