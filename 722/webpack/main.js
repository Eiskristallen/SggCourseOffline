import add from './js/add';
import './less/aa.less';
// import "@babel/polyfill";
import 'core-js';

// console.log(add(1, 5));

const a = new Promise((res, rej) => {
  res(a);
  rej(a);
  add(3, 5);
});
