function Logger(logString: string) {
  console.log('# LOGGER FACTORY');
  return (_: Function) => {
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('# TEMPLATE FACTORY');
  return <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) => {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('Logging...')
@WithTemplate('<h1>Matija was here</h1>', 'app')
class Person {
  name = 'Satoshi';

  constructor() {
    // console.log('Creating person object....');
  }
}

const pers = new Person();
// console.log(pers);

// --

const Log = (target: any, propertyName: string) => {
  console.log('%cProperty decorator', 'color:lightgreen');
  console.log(target);
  console.log(propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log('%cAccessor decorator', 'color:salmon');
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log('%cMethod decorator', 'color:violet');
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log('%cParameter decorator', 'color:yellow');
  console.log(target);
  console.log(name);
  console.log(position);
};

class Product {
  @Log
  _title: string;
  _price: number;

  constructor(t: string, p: number) {
    this._title = t;
    this._price = p;
  }

  @Log2
  set price(value: number) {
    if (value > 0) {
      console.log(this._title);
      this._price = value;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  get price() {
    return this._price;
  }

  get title() {
    return this._title;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p = new Product('ledger nano x', 140);
