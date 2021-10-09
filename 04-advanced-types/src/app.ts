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

printEmployeeInformatio(e1);
