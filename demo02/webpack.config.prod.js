const { smart } = require("webpack-merge");
const base = require("./webpack.config.base");

// 清理dist目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 压缩css文件
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = smart(base, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({
      // images不被清理
      //   cleanOnceBeforeBuildPatterns: ["**/*", "!images", "!image/**"],
    }),

    // 压缩css文件
    new OptimizeCssPlugin(),
  ],
});
