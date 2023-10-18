import _ from "lodash";
import "./style.css";
import AA from "./aa.jpg";

function Components() {
  // 创建节点
  const element = document.createElement("div");

  // 添加数据
  element.innerHTML = _.join(["hello", "webpack"]);

  // 添加类名
  element.classList.add("hello");

  const image = new Image();
  image.src = AA;

  element.appendChild(image);

  return element;
}
document.body.appendChild(Components());
