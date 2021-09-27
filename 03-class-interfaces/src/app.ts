class Department {
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department -- ${this.name} -- of ${this.id}`);
  }

  addEmployee(this: Department, employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation(this: Department) {
    console.log(`\t${this.employees.length} employess → ${this.employees}`);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[] = []) {
    super(id, 'ITDept');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[] = []) {
    super(id, 'Accounting');
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports(this: AccountingDepartment) {
    console.table(this.reports);
  }
}

const accounting = new Department('kf83', 'Accounting #old');
accounting.describe();

accounting.addEmployee('matija');
accounting.addEmployee('matrian rabić');
accounting.printEmployeeInformation();

const it = new ITDepartment('zu42', ['max']);
it.describe();

const acc = new AccountingDepartment('ac66', ['shit happens']);
acc.describe();
acc.addReport('something went wrong...');
acc.printReports();
