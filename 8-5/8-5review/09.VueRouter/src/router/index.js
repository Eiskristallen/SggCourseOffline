import Vue from "vue";
import VueRouter from "vue-router";
import message from "../pages/message";
import target from "../pages/target";
import Home from "../pages/home";
import About from "../pages/about";
import detail from "../pages/detail";

// 安装插件 --> 扩展了两个全局组件
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // 放置所有路由的配置
    // 每个路由配置都是一个对象
    {
      path: "/home", // 路由路径 -- 访问路径
      component: Home,
      children: [
        {
          //不知为何一定要加/
          path: "/message", // 路由路径 -- 访问路径
          component: message,
          children: [
            {
              path: "detail/:id",
              name: "detail",
              component: detail,
            },
          ],
        },
        {
          path: "/target", // 路由路径 -- 访问路径
          component: target,
        },
      ], // 路由组件，当地址变成 /home 要加载的组件
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      // path: "", // 就是 /
      redirect: "/home", // 重定向，会将地址 / 改成 /home
    },
  ],
});

export default router;
