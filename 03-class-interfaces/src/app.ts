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

class Person implements Greetable {
  constructor(public name?: string) {}

  greet(phrase: string): void {
    console.log(
      this.name
        ? `%c${phrase} ${this.name}`
        : `%c${phrase}...you dont have a name`,
      this.name ? 'color:lime' : 'color:red'
    );
  }
}

let user1: Greetable;
user1 = new Person();
user1.greet('dobar dan...');

const user2 = new Person('saul');
user2.greet('ćao...');
