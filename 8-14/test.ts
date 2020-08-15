// const hello: string = 'xix';
// console.log(hello);
// console.log(11);

// const globalV: number = 1;

// class Person {
//   a: number = 2;
//   static bb: number = 56;
//   talk(): void {
//     const b: number = 3;
//     console.log('something');
//   }
// }
// const obj = new Person();
// obj.talk();
// console.log(globalV, obj.a, Person.bb, Person);

// function findMax(a: number, b: number, c: number): any {
//   return a > b ? (a > c ? a : c) : b > c ? b : c;
// }
// // console.log(findMax(21, 32, 53));
// function reverseArray(arr: Array<number>): any {
//   let temp = 0;
//   for (let i = 0; i < arr.length / 2; i++) {
//     temp = arr[i];
//     arr[i] = arr[arr.length - 1 - i];
//     arr[arr.length - 1 - i] = temp;
//   }
//   return arr;
// }
// console.log(reverseArray([1, 23, 53, 342, 2234, 36, 54, 4324, 232]));

// function checkString(str: string): any {
//   for (let i = 0; i < Math.floor(str.length / 2); i++) {
//     if (str[i] !== str[str.length - 1 - i]) return false;
//   }
//   return true;
// }
// console.log(checkString('aba'));
let a: number | string;
a = 12;
console.log(a);
a = 'xixi';
console.log(a);
