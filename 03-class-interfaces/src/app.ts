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
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet: greetType;
  // greet(phrase: string): void;
}

interface Add {
  add: AddFn;
}

class Person implements Greetable {
  name?: string;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(`%c${phrase} ${this.name}`, 'color:coral');
    } else {
      console.log('You dont have a name');
    }
  }
}

let user1: Greetable;

user1 = new Person();
user1.greet('dobar dan...');
