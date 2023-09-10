import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "首页" },
    component: () => import("@/components/home/HomePage.vue"),
    children: [
      {
        path: "device",
        name: "device",
        meta: { title: "设备列表", transition: "moveUp" },
        component: () => import("@/components/device/DeviceList.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    meta: { title: "系统管理" },
    component: () => import("@/components/settings/Settings.vue"),
    children: [
      {
        path: "users",
        name: "users",
        meta: { title: "用户管理" },
        component: () => import("@/components/settings/UserList.vue"),
      },
      {
        path: "roles",
        name: "roles",
        meta: { title: "角色管理" },
        component: () => import("@/components/settings/RoleList.vue"),
      },
    ],
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});
export default router;