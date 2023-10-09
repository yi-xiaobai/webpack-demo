import "./index.less";

console.log("==>Get 111", env);

// 点击按钮加载js文件
document.getElementById("btn").onclick = function () {
  import("./handle").then((res) => {
    res.default();
  });
};

import axios from "axios";
axios.get("/api/info").then((res) => {
  console.log("==>Get res", res);
});
