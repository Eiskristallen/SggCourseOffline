/* 
webpack 打包的入口文件


*/

console.log(123213);
//引入App.vue
import Vue from "Vue";
import App from "./App.vue";
//因为htmlWebpackPlugin会给模板html自动引入打包后的样式和js代码,所以这个new vue的el会去public路径下的index.html中找
new Vue({
  el: "#app",
  render: (h) => h(App),
});
