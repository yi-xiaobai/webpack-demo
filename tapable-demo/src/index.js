const { SyncHook } = require("tapable");
const hook = new SyncHook(["args1", "args2"]);

hook.tap("a", function (args1, args2) {
  console.log("==>Get a", args1, args2);
});

hook.tap("b", function (args1, args2) {
  console.log("==>Get b", args1, args2);
});

hook.call(1, 2);
