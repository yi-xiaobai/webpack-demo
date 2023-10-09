const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");
const webpack = require("webpack");

module.exports = smart(base, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: "3000",
    hot: true,
    // stats: "errors-only",
    proxy: {
      "/api": "http://localhost:4000",
    },
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:4000",
    //     pathRewrite: {
    //       "/api": "",
    //     },
    //   },
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      env: JSON.stringify("devvvv"),
      flag: true,
    }),
  ], //热更新插件
});
