interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

let user1: Person;
user1 = {
  name: 'matija',
  age: 21,
  greet(phrase: string) {
    console.log(`%c${phrase} ${this.name}!`, 'color:yellow');
  },
};

user1.greet('ciao bella, its me,');
