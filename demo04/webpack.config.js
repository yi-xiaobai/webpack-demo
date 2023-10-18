const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    filename: "bundle.[hash:3].js",
    path: path.resolve(__dirname, "dist"),
  },

  // 模块
  module: {
    rules: [
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
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              esModule: false,
              outputPath: "assets",
              name: "[name].[hash:6].[ext]",
            },
          },
        ],
      },
    ],
  },

  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "使用Htmlwebpack插件",
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
    }),
  ],
};
