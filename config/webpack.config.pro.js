const path = require("path");
let htmlwebpackplugin = require("html-webpack-plugin"); //引入html-webpack-plugin插件
const MinicssExtractPlugin = require("mini-css-extract-plugin"); //引入提取CSS的模块
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { loader } = require("enhanced-resolve");
//serve 会根据命令输入的文件夹当做根路径打开一个静态资源服务器,这时候用publicPath才有用,所以要用server不能用vscode带的liveserver
module.exports = {
  entry: {
    main: "./722/webpack/main.js", //入口文件
  },
  output: {
    //path指定所有资源输出目录
    //filename指定入口1js文件的输出路径
    path: __dirname + "/../722/webpack/dis", //实际上输出文件的目录是path+filename,如果没指定filename的话,默认会去path指定的路径下
    filename: "build.js", //产出文件，name根据entry的入口文件键名定
    publicPath: "/", //指定所有文件的根路径,就是输出出来的最外层的文件夹
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: {
                    version: 3,
                  },
                  targets: "> 0.5%, not ie <= 9, not op_mini all, not dead",
                },
              ],
            ],
          },
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /\.less$/,
        use: [
          MinicssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")(),
              ],
            },
          },
          {
            loader: "less-loader",
            options: {},
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|wepb)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 12 * 1024,
              name: "img/[hash:10].[ext]", //不能加./,因为要以pubicPath开头,只需要该输出的文件路径,不需要改输出
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
      // },
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
      minify: false,
    }),
    new MinicssExtractPlugin({
      filename: "css/[name].css", //[name]chunk的名字默认就是main
    }),
    // new OptimizeCssAssetsPlugin({
    //   // assetNameRegExp: /\.optimize\.css$/g,
    //   // cssProcessor: require("cssnano"),
    //   cssProcessorPluginOptions: {
    //     preset: ["default", { discardComments: { removeAll: true } }],
    //   },
    //   // canPrint: true,
    // }),
    // new CleanWebpackPlugin(),
  ],
  //   devServer: {
  //     //devserver在内存中编译打包,所以不会有输出文件
  //     contentBase: path.join(__dirname, "../722/webpack/dis/"),
  //     compress: true,
  //     port: 9000,
  //     open: true,
  //     // clientLogLevel: "none", //关闭客户端打印结果
  //     // quiet: true, //让终端打印信息变少(注意如果报错也不会打印)
  //   },
  devtool: "source-map", //dev-server调试工具
};
