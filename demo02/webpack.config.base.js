// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 拷贝文件
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const config = require("./public/config")[isDev ? "dev" : "test"];

const path = require("path");
module.exports = {
  // 入口
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  // 出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[name].[hash:6].js",
    publicPath: "/",
  },
  // 模式
  mode: "development",
  // 控制是否生成，以及如何生成 source map。
  devtool: "cheap-module-eval-source-map",

  //  插件
  plugins: [
    new HtmlWebpackPlugin({
      title: "标题属性",
      filename: "index.html",
      template: "./public/index.html",
      //   minify: {
      //     removeAttributeQuotes: false, //是否删除属性的双引号
      //     collapseWhitespace: false, //是否折叠空白
      //   },
      config: config.template,
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "标题属性",
      filename: "login.html",
      template: "./public/login.html",
      chunks: ["login"],
      //   minify: {
      //     removeAttributeQuotes: false, //是否删除属性的双引号
      //     collapseWhitespace: false, //是否折叠空白
      //   },
    }),

    // 拷贝文件
    new CopyWebpackPlugin(
      [
        {
          from: "public/js/*.js",
          to: path.resolve(__dirname, "dist", "js"),
          flatten: true,
        },
      ],
      {
        ignore: ["other.js"], // 忽略某个文件
      }
    ),

    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  module: {
    rules: [
      //将JS代码向低版本转换
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },

      // 处理样式文件
      {
        test: /\.(le|c)ss$/,
        use: [
          //   "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
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

      // 处理图片
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              esModule: false,
              name: "[name]_[hash:6].[ext]", // 名称
              outputPath: "assets", //文件夹
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
    hot: true,
  },
};
