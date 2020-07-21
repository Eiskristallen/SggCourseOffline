const path = require("path");
let htmlwebpackplugin = require("html-webpack-plugin"); //引入html-webpack-plugin插件
const { rule } = require("_postcss@7.0.32@postcss");

module.exports = {
  entry: {
    main: __dirname + "/7-21/webpack/main.js", //入口文件
  },
  output: {
    path: __dirname + "/7-21/webpack/dis",
    filename: "build.js", //产出文件，name根据entry的入口文件键名定
  },
  mode: "development",
  module: {
    loaders: [
      {
        test: /\.less$/,
        use: ["less-loader", "css-loader", "style-loader"],
      },
    ],
  },
  plugins: [
    //new一个模板出来，这一个不使用chunks
    // new htmlwebpackplugin({
    //   template: "./app/home.html", //入口文件
    //   filename: "home1.html", //产出文件
    // }),
    //new一个模板出来
    new htmlwebpackplugin({
      template: "./7-21/webpack/index.html", //入口文件
      filename: "home2.html", //产出文件
      chunks: "./7-21/webpack/dis/build.js", //可以设置chunks按需引入JS文件，不设置就会引入所有产出的js
      chunksSortMode: "manual", //将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
    }),
  ],
};
