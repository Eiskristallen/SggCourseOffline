//vue + normal production environment
//引入路径模块
const path = require("path");
//引入html plugin模块
const htmlTemplatePlugin = require("html-webpack-plugin");
//引入vue loader模块
const vueLoaderPlugin = require("vue-loader/lib/plugin");
//引入copy模块,因为模板html可能在未来会引用外部css,所以要将CSS拷贝到输出的目录下
const copy = require("copy-webpack-plugin");
//抽取css的模块
const MinicssExtractPlugin = require("mini-css-extract-plugin");
//优化css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//向外暴露1配置模块
module.exports = {
  entry: {
    main: __dirname + "./src/main.js",
    //入口文件
  },
  outPut: {
    path: path.resolve(__dirname, "./dist"),
    //输出文件目录
    fileName: "js/[name].js",
    //输出文件的文件名(filename+path才是完整的路径)
    //公共资源路径,所有资源引入,这样输出的路径就不用写前面的/,默认从根目录开始找
    publicPath: "/",
  },
  modules: {
    //loader

    rules: [
      {
        test: /\.less$/,

        use: [
          //将JS中的css提取成单独文件
          MinicssExtractPlugin.loader,
          "css-loader",
          "vue-style-loader",
          {
            //css兼容性处理(c3)
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
          "less-loader",
        ],
      },
      {
        //处理图片
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "images/[name].[hash:10].[ext]",
        },
      },
      {
        //处理html里面的图片
        test: /\.html$/,
        loader: "html-loader",
        options: {
          //这个attribute是处理当html引入了额外的css文件
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
        //处理js,要用coreJS和babel  babel负责将一些简单的es6语法转es5, coreJS负责转换复杂的
        test: /\.js$/,
        // 排除node_modules不处理
        exclude: /node_modules/,
        use: {
          // 将ES6简单语法编译成ES5一下语法
          // 一旦遇到复杂语法如：promise、generator就处理不了
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage", // 按需加载
                  corejs: { version: 3 },
                  // 浏览器兼容性
                  targets: "> 0.5%, not ie <= 9, not op_mini all, not dead",
                },
              ],
            ],
          },
        },
      },
      {
        //vue-loader
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        //eslint   代码规范化
        //必须要在babel编译之前先检查,所以放最下面
        test: /\.js$/,
        //设定最优先执行

        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          //自动修正
          fix: true,
        },
      },
    ],
  },
  //插件
  plugins: [
    //html模板插件
    new htmlTemplatePlugin({ template: "./public/index.html" }),
    //抽取css插件
    new MinicssExtractPlugin({ filename: "css/[name].css" }),
    //优化css插件
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      // canPrint: true
    }),
    //vueloader插件
    new vueLoaderPlugin(),
    //把模板html可能引入的额外CSS拷贝到要输出的路径文件夹下面
    new copy({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
          globOptions: {
            //要忽略html不复制,不然会覆盖,html已经被htmlwebpackplugin处理过了
            ignore: ["index.html"],
          },
        },
      ],
    }),
  ],
  //   模式
  mode: "production",
  //配置devServer
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 8752,
    host: "127.0.0.1",
    compress: true,
    open: true,
  },
  //devtool
  devtool: "eval-cheap-source-map",
  //性能提示
  performance: false,
  //解析文件扩展名
  resolve: [".js", ".vue", ".json"],
};
