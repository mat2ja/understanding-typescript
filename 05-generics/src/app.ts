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

// console.log(extractAndConvert({ name: 'matija' }, 'name'));

class DataStorage<T> {
  constructor(private data: T[] = []) {}

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    const idx = this.data.indexOf(item);
    if (idx === -1) {
      return;
    }
    this.data.splice(idx, 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>(['rust']);

textStorage.addItem('kotlin');
textStorage.removeItem('kotlin');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);
numberStorage.addItem(6);

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'patrik' });
// objStorage.addItem({ name: 'mateo' });
// objStorage.removeItem({ name: 'patrik' });
// console.log(objStorage.getItems());

const objStorage = new DataStorage<object>();
// by reference
const patrikObj = { name: 'patrik' };
const mateoObj = { name: 'mateo' };
objStorage.addItem(patrikObj);
objStorage.addItem(mateoObj);
objStorage.removeItem(patrikObj);
console.log(objStorage.getItems());
