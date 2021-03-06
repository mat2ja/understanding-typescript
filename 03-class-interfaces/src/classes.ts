abstract class Department {
  public static fiscalYear = 2021;
  protected employees: string[] = [];
  abstract isCool: boolean;

  constructor(protected readonly id: string, public name: string) {
    // console.log(`Created dept in ${Department.fiscalYear}!`);
  }

  static createEmployee(name: string) {
    return { name };
  }

  abstract describe(): void;

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
  public isCool = true;
  constructor(id: string, public admins: string[] = []) {
    super(id, 'ITDept');
  }

  describe(this: ITDepartment) {
    console.log(`%c🤡 BOOOOIS FROM IT (${this.id})`, 'color:magenta');
  }
}

class AccountingDepartment extends Department {
  public isCool = false;
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[] = []) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountingDepartment('ac66', []);
    }
    return this.instance;
  }

  describe(this: AccountingDepartment) {
    console.log(`%c🤑 ACCOUNTING GANG GANG (${this.id})`, 'color:yellow');
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
    console.log('Reports:', this.reports);
  }
}

/**
 ** Department class
 */
// Static properties
const employee1 = Department.createEmployee('Billy');
console.log('Static employee:', employee1);
console.log('Fiscal year:', Department.fiscalYear);

/**
 ** IT Department
 */
const it = new ITDepartment('zu42', ['max', 'visnja']);
it.describe();
console.log('Admins:', it.admins);

/**
 ** Accounting Department
 */
// const acc = new AccountingDepartment('ac66', []);
const acc = AccountingDepartment.getInstance();
const acc2 = AccountingDepartment.getInstance();
acc.describe();
console.log('They the same instance.', acc === acc2);

// Adding reports
acc.addReport('something went wrong...');
acc.addReport('idemo online!');
acc.mostRecentReport = 'street workout has gone well';
// console.log('Most recent report:', acc.mostRecentReport);
acc.printReports();

// Adding emploeyees
acc.addEmployee('manu');
acc.addEmployee('robi');
acc.addEmployee('max');
acc.printEmployeeInformation();
