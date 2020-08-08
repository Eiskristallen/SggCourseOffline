import vue from "vue";
import vueroute from "vue-router";
import target from "../pages/target";
import message from "../pages/message";
import home from "../pages/home";
import about from "../pages/about";
import detail from "../pages/detail";
import heiheihei from "../pages/heiheihei";
import hahaha from "../pages/hahaha";
//引入必要组件

//注册route插件
vue.use(vueroute);
//路由对象
const router = new vueroute({
  routes: [
    {
      //每个对象都是一个路由
      //path代表网页加载的路径/component代表到该路径时显示那个组件
      path: "/home",
      component: home,
      //children里面放子路由
      children: [
        {
          path: "/message",
          component: message,
          children: [
            {
              path: "/detail/:id",
              name: "detail",
              component: detail,
              children: [
                {
                  path: "/heiheihei/:id",
                  name: "heiheihei",
                  component: heiheihei,
                },
                {
                  path: "/hahaha/:id",
                  name: "hahaha",
                  component: hahaha,
                },
              ],
            },
          ],
        },
        { path: "/target", component: target },
      ],
    },
    {
      path: "/about",
      component: about,
    },
  ],
});
export default router;
