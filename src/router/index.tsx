import { initRouter } from "@/use/useRouter";
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "首页",
      components: {
        default: () => import("../pages/index/index"),
      },
    },
    {
      path: "/selectBit",
      name: "选择位",
      components: {
        default: () => import("../pages/selectBit/index"),
      },
    },
    {
      path: "/confirmInfo",
      name: "确认信息",
      components: {
        default: () => import("../pages/confirmInfo/index"),
      },
    },
    {
      path: "/successPayment",
      name: "支付成功",
      components: {
        default: () => import("../pages/successPayment/index"),
      },
    },
    {
      path: "/virtues",
      name: "功德",
      components: {
        default: () => import("../pages/virtues/index"),
      },
    },

    // {
    //   path: "/login",
    //   name: "登录",
    //   components: {
    //     default: () => import("../pages/login/index"),
    //   },
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Check if the meta field 'keepScrollPosition' is true
    if (to.meta.keepScrollPosition && from.meta.keepScrollPosition) {
      return false; // Do not change scroll position
    } else {
      (
        (document.querySelector(".app") as any) || { scrollTop: 0 }
      ).scrollTop = 0;
    }
  },
});
initRouter(router);

export default router;

export const getCurrentRouter = () => {
  return router.currentRoute.value;
};
