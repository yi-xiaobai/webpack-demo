module.exports = function (source) {
  const callback = this.async();

  const options = this.query;
  console.log("==>Get options", options);
  console.log("==>Get source", source);

  const { author, email } = options || {};

  const newContent = `
  /**
   * @Author:${author}
   * @Email:${email}
   * */

  ${source}
  `;

  setTimeout(() => {
    callback(null, JSON.stringify(newContent), null, {});
  }, 1000);
};
