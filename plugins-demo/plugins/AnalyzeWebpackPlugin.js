class AnalyzeWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // markdown头部
    let content = `|   filename   |   size   |
| :--: | :--: |
`;

    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      console.log("==>Get 资源内容", compilation.assets);
      console.log("==>Get 配置选项", compilation.options);
      console.log("==>Get 配置选项", compilation.entrypoints);

      // 定义数组
      const ans = [];

      // 获取输出资源列表
      Object.keys(compilation.assets).forEach((item) => {
        let file = compilation.assets[item];
        ans.push({
          filename: item,
          size: Math.ceil(file.size() / 1024),
        });
      });

      // 降序
      ans.sort((a, b) => {
        b.size - a.size;
      });

      ans.forEach((item) => {
        const { filename, size } = item;
        const str = `| ${filename} | ${size}kb |`;
        content += str + "\n";
      });

      // 输出markdown文件
      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
