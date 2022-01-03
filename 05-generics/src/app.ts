// const names: Array<string> = [];

// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done');
//   }, 2000);
// });

// promise.then((data) => {
//   data.split(' ');
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge(
  { name: 'tomo', languages: ['flutter', 'golang'], hasBtc: false },
  { age: 20 }
);
// console.log(mergedObj.name);

interface Lengthy {
  length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value';
  if (element.length === 1) {
    description = 'Got 1 element';
  } else if (element.length > 1) {
    description = `Got ${element.length} elements`;
  }
  return [element, description];
}

// console.log(countAndPrint('hi there boomguzzler'));
// console.log(countAndPrint(['vue', 'svelte']));
// console.log(countAndPrint('r'));
// console.log(countAndPrint({ length: 69 }));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

extractAndConvert({ name: 'matija' }, 'name');

