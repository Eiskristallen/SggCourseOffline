//引入路径文件
const path = require("path");
//由于是生产环境(要生产文件),所以不添加devServer,改用serve -s运行文件
//html插件
const htmlWebpackPlugin = require("html-webpack-plugin");
//Css抽取插件,提取CSS生成新的Css文件(不直接写在JS里面)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩CSS插件
const optimizeCssAssets = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    //入口文件
    main: "./722/webpack/main.js",
  },
  //输出文件
  output: {
    //指定路径,完整路径为path+filename
    path: path.resolve(__filename, "/webpack/dis"),
    filename: "build.js",
    publicPath: "/", //publicPath会默认加载在所有输出文件的前面,代表运行的根目录,
  },
  mode: "production",
  modules: {
    //css的loader
    rules: [
      {
        //用正则匹配要转换的文件
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //处理css兼容问题
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
            //处理less文件
            loader: "less-loader",
            options: {},
          },
        ],
      },
      {
        //转换处理样式文件里面的图片
        test: /\.(png|jpe?g|gif|wepb)$/,
        use: [
          {
            //用urlloader
            loader: "url-loader",
            options: {
              //最大尺寸,如果大于这个尺寸则丢进js文件里面
              limit: 10 * 1024,
              //输出的文件的文件名,和地点
              name: "images/[hash:10].[ext]",
            },
          },
        ],
      },
      {
        //处理写在html里面的图片
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        //处理高版本的JS语言(commonJS转换,ES6=>ES5 etc)
        test: /\.js$/,
        //不需要处理的文件
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              //babel插件预定义的环境配置,能够用来解析一些没那么难的ES6语法例如const之类的
              preset: [
                [
                  "babel-preset-evr",
                  {
                    //用coreJS去处理高级ES6语法(promise之类),因为coreJS可以按需加载需要的转换代码,不会像polyfill一样全部加载进来,进而减少输出文件的体积
                    useBuilInts: "usage", //按需加载
                    corejs: { version: 3 }, //声明coreJS版本
                    //设置需要兼容的浏览器
                    targets: "> 0.5%, not ie <= 9, not op_mini all, not dead",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        //eslint,代码规范,增强代码可读性,如果代码写的不符合规范就会报错
        test: /\.js$/,
        enforce: "pre", //强制优先执行,避免babel先转换代码
        //不检查的代码
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          //为true的情况下,eslint会修复它能修复的错误
          fix: true,
        },
      },
    ],
  },
  //扩展插件
  pulgins: [
    //该插件可以根据一个已经被提供的模板,在输出文件里创建一个html文件,并且自动引入输出(打包后)的JS和样式文件
    new htmlWebpackPlugin({
      template: "./722/webpack/index.html",
      minify: true, //压缩打包出来的html文件
    }),
    //该插件可以抽出要打包的文件里面的样式文件,整合成为一个样式文件输出
    new MiniCssExtractPlugin({
      //filename包含了设置文件名字和输出目录
      filename: "css/[name].css",
    }),
    //压缩输出后的样式文件
    new optimizeCssAssets({
      // assetNameRegExp: /\.css$/g,
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      // canPrint: true
    }),
  ],
  devServer: {
    //服务器启动目录
    contentBase: path.join(__dirname, "../722/webpack/dis/"),
    //自动打开浏览器
    open: true,
    //压缩文件
    compress: true,
    //服务器启动端口号
    port: 9822,
  },
  // devtool: "eval-cheap-module-source-map", // 开发环境
  // devtool: 'cheap-module-source-map' // 生产环境 优点：速度快 缺点：提示相对更差
  devtool: "source-map", // 生产环境：优点：提示更加友好 缺点：速度慢
  performance: false, // 关掉性能提示
};
