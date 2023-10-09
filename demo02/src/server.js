let express = require("express");

const app = express();

app.get("/api/info", (req, res) => {
  res.json({
    code: 0,
    msg: "ok",
    data: 10000,
  });
});

// 监听4000端口
app.listen(4000, function () {
  console.log("监听端口成功～");
});
