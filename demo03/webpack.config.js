const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./main.js",
  plugins: [new CleanWebpackPlugin()],
};
