import add from "./js/add";
import "./less/aa.less";

import "@babel/polyfill";
console.log(add(1, 5));
const a = new Promise((res, rej) => {
  res(111);
});
