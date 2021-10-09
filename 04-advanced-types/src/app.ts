type Admin = {
  name: string;
  priviliges: string[];
};
interface Employee {
  name: string;
  startDate: Date;
}

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

// Discriminated union - we have a common property that could be used to check
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
moveAnimal({
  type: 'bird',
  flyingSpeed: 23,
});
moveAnimal({
  type: 'horse',
  runningSpeed: 45,
});
