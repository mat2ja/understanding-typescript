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

// ---------------------------------------------------

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

// ---------------------------------------------------

const p1 = new Product('ledger nano x', 140);
const p2 = new Product('ledger nano s +', 90);

function Autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = 'Hey I am working and decorators are not that good';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', printer.showMessage.bind(printer));
button.addEventListener('click', printer.showMessage);

// ---------------------------------------------------

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  const className = target.constructor.name;

  registeredValidators[className] = {
    ...registeredValidators[className],
    [propName]: [
      ...(registeredValidators[className]?.[propName] ?? []),
      'required',
    ],
  };
  // { Course: { title: ['required'] }}
}
function MinLength(target: any, propName: string) {
  const className = target.constructor.name;

  registeredValidators[className] = {
    ...registeredValidators[className],
    [propName]: [
      ...(registeredValidators[className]?.[propName] ?? []),
      'minLength',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  const className = target.constructor.name;

  registeredValidators[className] = {
    ...registeredValidators[className],
    [propName]: [
      ...(registeredValidators[className]?.[propName] ?? []),
      'positive',
    ],
  };
  // { Course: { price: ['positive'] }}
}

function TooLargeNumber(target: any, propName: string) {
  const className = target.constructor.name;

  registeredValidators[className] = {
    ...registeredValidators[className],
    [propName]: [
      ...(registeredValidators[className]?.[propName] ?? []),
      'tooLarge',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  console.log(objValidatorConfig);
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'minLength':
          isValid = isValid && obj?.length > 5;
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
        case 'tooLarge':
          isValid = isValid && obj[prop] < 100;
          break;
        default:
      }
    }
  }
  return isValid;
}

class Course {
  @MinLength
  @Required
  title: string;
  @TooLargeNumber
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form') as HTMLFormElement;
courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleEl = document.querySelector('#title') as HTMLInputElement;
  const priceEl = document.querySelector('#price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    return alert('Invalid input');
  }

  courseForm.reset();
  console.log(createdCourse);
});
