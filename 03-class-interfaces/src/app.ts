// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

type greetType = (phrase: string) => void;

interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet: greetType;
  // greet(phrase: string): void;
}

interface Add {
  add: AddFn;
}

class Person implements Greetable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string): void {
    console.log(`%c${phrase} ${this.name}`, 'color:coral');
  }
}

let user1: Greetable;

user1 = new Person('matija');
user1.greet('dobar dan...');
