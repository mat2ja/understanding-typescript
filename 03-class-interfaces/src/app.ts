type greetType = (phrase: string) => void;

interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet: greetType;
  // greet(phrase: string): void;
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
