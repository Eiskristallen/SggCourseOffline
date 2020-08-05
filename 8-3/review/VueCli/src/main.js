//引入app组件,渲染到页面上
import Vue from "vue";
import App from "./App";
import store from "./Store";
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  store,
  //渲染
  render: (h) => h(App),
  //挂载
}).$mount("#app");
