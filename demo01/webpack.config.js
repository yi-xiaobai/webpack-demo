// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const config = require("./public/config")[isDev ? "dev" : "test"];

module.exports = {
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
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"],
                  }),
                ];
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
              name:'[name]_[hash:6]_[ext]',
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

  devtool: "cheap-module-eval-source-map", // 开发环境下使用
};
