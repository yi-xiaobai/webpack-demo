const path = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清理dist目录插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 复制插件
const copyPlugin = require("copy-webpack-plugin");
// 抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 压缩css文件  开发环境不需要
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const config = require("./public/config")[isDev ? "dev" : "test"];

module.exports = {
  // 入口文件 可以是一个字符串  一个数组 一个对象
  entry: "./src/index.js",

  // 出口配置
  output: {
    path: path.resolve(__dirname, "dist"), // 路径
    // filename: "bundle.js", // 文件名
    filename: "bundle.[hash:6].js", // 文件名(考虑到缓存问题 加上hash)
    publicPath: "/",
  },

  // 模式
  mode: isDev ? "development" : "production",

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html", // 打包后的文件名
      config: config.template,
      //   minify: {
      //     removeAttributeQuotes: false, // 是否删除属性的双引号
      //     collapseWhitespace: false, //是否折叠空白
      //   },
      // hash: true //是否加上hash，默认是 false
    }),

    // 不需要传参数
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //  不删除dll以及下面的文件
    }),

    new copyPlugin(
      [
        {
          from: "public/js/*.js",
          to: path.resolve(__dirname, "dist", "js"),
          flatten: true, // 此处如果设置为false 会把文件夹路径都拷贝上 顾遥设置为true
        },
      ],
      {
        ignore: ["other.js"], // 忽略的文件夹数组
      }
    ),

    //  抽离css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    // 压缩css文件
    new OptimizeCssPlugin(),
  ],

  // 模块
  module: {
    rules: [
      // babel是一个js的编译器
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },

      // 针对样式文件的loader
      {
        test: /\.(le|c)ss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("autoprefixer")()];
              },
            },
          },
          "less-loader",
        ],
        exclude: /node_modules/,
      },

      // 针对图片处理的loader
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, // 10k
              esModule: false,
              name: "[name]_[hash:6].[ext]", // 图片资源名称
              outputPath: "assets", // 本地资源打包文件夹
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  // webpack端口等配置
  devServer: {
    port: "3000", //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩
  },

  devtool: "source-map", // 开发环境下使用
};
