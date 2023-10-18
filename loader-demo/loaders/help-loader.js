module.exports = function (source) {
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
  return newContent;
};
