const babel = require("@babel/core");
module.exports = function (source) {
  const options = this.query;
  console.log("==>Get options", options);
  const callback = this.async();
  babel.transform(source, options, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
};
