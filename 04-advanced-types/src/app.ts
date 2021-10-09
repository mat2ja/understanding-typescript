type Admin = {
  name: string;
  priviliges: string[];
};
interface Employee {
  name: string;
  startDate: Date;
}

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'hehe',
  startDate: new Date('2020-12-23'),
  priviliges: ['money', 'sex', 'drugs'],
};
console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // type is number as thats the only intersection

const u: Universal = 21;
