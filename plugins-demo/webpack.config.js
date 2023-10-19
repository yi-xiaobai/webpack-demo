const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyExampleWebpackPlugins = require("./plugins/MyExampleWebpackPlugins");
const AnalyzeWebpackPlugin = require("./plugins/AnalyzeWebpackPlugin");
const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new MyExampleWebpackPlugins({
      name: "yyds",
      age: 18,
    }),
    new AnalyzeWebpackPlugin(),
  ],
};
