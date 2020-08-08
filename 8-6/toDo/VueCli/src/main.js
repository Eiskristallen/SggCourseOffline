//引入app组件,渲染到页面上
import Vue from "vue";
import App from "./App";
import store from "./Store";
//引入store模块

Vue.config.productionTip = false;

new Vue({
  //渲染
  render: (h) => h(App),
  //挂载store模块至APP,app组件可以拿到store模块
  store,
  //挂载
}).$mount("#app");
