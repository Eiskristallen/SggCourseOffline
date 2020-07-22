const path = require("path");
let htmlwebpackplugin = require("html-webpack-plugin"); //引入html-webpack-plugin插件
const { rule } = require("_postcss@7.0.32@postcss");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./722/webpack/main.js", //入口文件
  },
  output: {
    path: __dirname + "/../722/webpack/dis",
    filename: "build.js", //产出文件，name根据entry的入口文件键名定
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|wepb)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 12 * 1024,
              name: "[hash:10].[ext]",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
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
      template: "./722/webpack/index.html", //入口文件
      // filename: "home2.html", //产出文件
      // chunks: "./7-21/webpack/dis/build.js", //可以设置chunks按需引入JS文件(只能是打包生成的)，不设置就会引入所有产出的js
      // chunksSortMode: "manual", //将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
    }),
    // new CleanWebpackPlugin(),
  ],
  devServer: {
    //devserver在内存中编译打包,所以不会有输出文件
    contentBase: path.join(__dirname, "../722/webpack/dis/"),
    compress: true,
    port: 9000,
    open: true,
    // clientLogLevel: "none", //关闭客户端打印结果
    // quiet: true, //让终端打印信息变少(注意如果报错也不会打印)
  },
  devtool: "source-map", //dev-server调试工具
};
