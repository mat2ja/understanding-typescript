class Department {
  public static fiscalYear = 2021;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    console.log(`Created dept in ${Department.fiscalYear}!`);
  }

  static createEmployee(name: string) {
    return { name };
  }

  describe(this: Department) {
    console.log(
      `%cDepartment -- ${this.name} -- of ${this.id}`,
      'color:orange'
    );
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(
      `%c\tEmployees: ${this.employees.length} → ${this.employees}`,
      'color:violet'
    );
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[] = []) {
    super(id, 'ITDept');
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[] = []) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name !== 'max') {
      this.employees.push(name);
    }
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value');
    }
    this.addReport(value);
  }

  printReports() {
    console.log(this.reports);
  }
}

/**
 ** Department class
 */
const accounting = new Department('kf83', 'Accounting #old');
accounting.describe();

accounting.addEmployee('matija');
accounting.addEmployee('matrian rabić');
accounting.printEmployeeInformation();

// Static properties
const employee1 = Department.createEmployee('Billy');
console.log('Static employee:', employee1);
console.log('Fiscal year:', Department.fiscalYear);

/**
 ** IT Department
 */
const it = new ITDepartment('zu42', ['max', 'visnja']);
it.describe();
console.log(it.admins);

/**
 ** Accounting Department
 */
const acc = new AccountingDepartment('ac66', ['shit happens']);
acc.describe();

// Adding reports
acc.addReport('something went wrong...');
acc.addReport('idemo online!');
acc.mostRecentReport = 'street workout has gone well';
console.log('Most recent report:', acc.mostRecentReport);
acc.printReports();

// Adding emploeyees
acc.addEmployee('manu');
acc.addEmployee('robi');
acc.addEmployee('max');
acc.printEmployeeInformation();
