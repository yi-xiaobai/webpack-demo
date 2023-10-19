class MyExampleWebpackPlugins {
  constructor(options) {
    console.log("==>Get options", options);
  }

  apply(compiler) {
    // 编译(compilation)完成。
    compiler.hooks.done.tap("MyExampleWebpackPlugins", (stats) => {
      console.log("hello world plugins");
      // console.log("==>Get stats", stats);
    });

    // 生成资源到 output 目录之前。
    compiler.hooks.emit.tap("MyExampleWebpackPlugins", (res) => {
      console.log("==>Get 生成资源到 output 目录之前。");
      // console.log("==>Get res", res);
    });

    // 生成资源到 output 目录之后。
    compiler.hooks.afterEmit.tap("MyExampleWebpackPlugins", (compilation) => {
      console.log("==>Get 生成资源到 output 目录之后。");
      // console.log("==>Get compilation", compilation);
    });
  }
}

module.exports = MyExampleWebpackPlugins;
