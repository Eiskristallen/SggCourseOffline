const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "js/[name].js",
  },
  module: {
    //npm i css-loader style-loader
    rules: [
      //loader
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        // npm i url-loader file-loader -D
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "static/media/[name].[hash:10].[ext]",
        },
      },
      {
        // npm i html-loader -D
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              {
                // Attribute name
                attribute: "src",
                // Type of processing, can be `src` or `scrset`
                type: "src",
                // Allow to filter some attributes (optional)
                filter: (tag, attribute, attributes, resourcePath) => {
                  // 过滤除img标签以外的元素
                  // 只处理img图片
                  return tag.toLowerCase() === "img";
                },
              },
            ],
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  //npm -i htmlwebpackplugin
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "dist"),
        // globOptions: {
        // 忽略 index.html 不复制
        // 原因：因为 index.html 已经被 HtmlWebpackPlugin 处理过了
        ignore: ["index.html"],
        // },
      },
    ]),
  ],
  mode: "development",

  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9822,
    host: "127.0.0.1",
    open: true,
    compress: true,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      // 路径别名,前面的这个@assets就等于后面的路径,可以简写
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
};
