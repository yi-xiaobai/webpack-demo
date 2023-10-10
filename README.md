# webpack

## 什么是 webpack

> webpack 是一个 JS 应用程序的静态模块打包器

package.json 文件创建

```bash
npm init -y
```

安装 webpack、webpack-cli

```bash
npm i webpack webpack-cli -D
```

## 入口

入口的字段：==**entry**==，可以是一个==字符串、数组、对象==

```js
//webpack.config.js
module.exports = {
  entry: "./src/index.js",
};
```

## 出口

出口的字段：==**output**

```js
const path = require("path");
//webpack.config.js
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js", // 文件名
    path: path.resolve(__dirname, "dist"), // 路径
    publicPath: "/",
  },
};
```

## mode

> 模式

1.  development
2.  production

## loader

### babel-loader

> 将 js 转为低版本

安装依赖

```bash
npm i babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
npm i @babel/runtime @babel/runtime-corejs3 --save
```

配置文件如下

```js
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/, // 排序node_modules目录 提升编译效率
      },
    ],
  },
};
```

可以在==.babelrc==中编写配置，也可以在==webpack==中

#### .babelrc

```bash
{
    "presets":["@babel/preset-env"],
    "plugins":[
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs":3
            }
        ]
    ],
}
```

#### webpack.config.js

```js
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 匹配规则
        use: {
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
        exclude: /node_modules/, // 排序node_modules目录 提升编译效率
      },
    ],
  },
};
```

**use**字段可以是一个**字符串**，例如：==use:"babel-loader"==，
也可以是一个数组，数组元素可以是**字符串**或者是**对象**，
需要对==loader==进行配置时，需要编写一个对象，用==options==字段进行配置

### 样式文件处理

安装依赖

```bash
npm i style-loader less-loader css-loader postcss-loader autoprefixer less -D
```

```js
//webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
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
        exclude: /node_modules/, // 排除哪个文件夹
      },
    ],
  },
};
```

### 图片/字体文件处理

安装依赖

```bash
npm i url-loader file-loader -D
```

```js
//webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              esModule: false,
              name: "[name]_[hash:6].[ext]", // 文件名
              outputPath: "assets", // 输出的文件夹
            },
          },
        ],
        exclude: /node_modules/, // 排除哪个文件夹
      },
    ],
  },
};
```

## plugins

### html-webpack-plugin

> 在 webpack 构建后，把入口 js 文件引入到生成好的 html 文件中

安装依赖

```bash
npm i html-webpack-plugin -D
```

在==webpack.config.js==进行配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
//webpack.config.js
module.exports = {
    //...
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",  // 打包后的文件名
            template:"./public/index.html"  // 模板
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        })
    ]
}
```

### clean-webpack-plugin

> 构建时，清理 dist 目录

安装依赖

```bash
npm i clean-webpack-plugin -D
```

在==webpack.config.js==进行配置

```js
const CleanWebpackPlugin = require("clean-webpack-plugin");
//webpack.config.js
module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录下的文件
    }),
  ],
};
```
