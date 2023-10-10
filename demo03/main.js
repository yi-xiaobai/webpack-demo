import { A } from "./lib/a";
import B from "./lib/b";
console.log(A);
B();

import("./lib/c").then((res) => {
  console.log("==>Get res", res);
});
