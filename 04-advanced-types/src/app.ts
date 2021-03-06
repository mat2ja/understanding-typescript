type Admin = {
  name: string;
  priviliges: string[];
};
interface Employee {
  name: string;
  startDate: Date;
}

//* Intersection types
// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Employee & Admin;

const e1: ElevatedEmployee = {
  name: 'hehe',
  startDate: new Date('2020-12-23'),
  priviliges: ['money', 'sex', 'drugs'],
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // type is number as thats the only intersection

//* Type guards
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  } else {
    return a + b;
  }
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInformatio(emp: UnknownEmployee) {
  console.log('Name:', emp.name);
  if ('priviliges' in emp) {
    console.log('Privilegies:', emp.priviliges);
  } else {
    console.log('Start date', emp.startDate);
  }
}

class Car {
  drive() {
    console.log('Driving...');
  }
  mph() {
    console.log('Drivin real fast...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck..');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...', amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  console.log('%c##### VEHICLE ####', 'color:gold');
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(23);
  } else {
    vehicle.mph();
  }
}

// useVehicle(v1);
// useVehicle(v2);

//* Discriminated union - we have a common property that could be used to check
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed of', speed);
}
// moveAnimal({ type: 'bird', flyingSpeed: 23 });
// moveAnimal({ type: 'horse', runningSpeed: 45 });

//* Type casting
// const userInputElement2 = document.querySelector('input')!; // typescript knows its an input
// const userInputElement = <HTMLInputElement>(document.getElementById('user-input'));
const userInputElement = document.getElementById(
  'user-input'
) as HTMLInputElement | null; // ts doesn't know cos its fetched by id, so we cast it to input element

if (userInputElement) {
  userInputElement.value = 'Hi there';
}

//* Index properties
interface ErrorContainer {
  // we dont know how much props, or the name of props, but they all will be string:string
  [prop: string]: string;
}

// const errorBag: Record<string, string> = {
const errorBag: ErrorContainer = {
  email: 'not a valid email',
  username: 'name must be longer than 3 characters',
};

//* Function overloads
// function add2(n:number): number;
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: string, b: number): string;
function add2(a: number, b: string): string;
function add2(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  } else {
    return a + b;
  }
}

// const result = add2('2', '1') as string;
const result = add2('marko', 'kupio shitcoin');
// console.log(result.split(' '));

const result2 = add2('hehehe', 3);
// console.log(result2);

const result3 = add2(432, -12);
// console.log(result3);

//* Optional chaining
const user1 = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', desc: 'his own company' },
};

const user2 = {
  id: 'u2',
  name: 'Malvin',
};

// Optional chaining
// [user1, user2].forEach((user) => console.log(user?.job?.title));

// Nullish coalescing
const userInput = null;
const storedData = userInput ?? 'DEFAULT';
