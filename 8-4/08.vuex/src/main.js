import Vue from "vue";
import store from "./Store";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
