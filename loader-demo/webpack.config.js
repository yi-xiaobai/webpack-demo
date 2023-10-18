const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash:6].js",
    path: resolve(__dirname, "dist"),
  },
  mode: "development",
  //   devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "./loaders/my-babel-loader.js?cacheDirectory=true",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "./loaders/help-loader.js",
            options: {
              author: "yyds",
              email: "lyyl6270@163.com",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()],
};
