function Logger(logString: string) {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return (_: Function) => {
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

// @Logger(' LOGGING - PERSON')
@WithTemplate('<h1>Matija was here</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object....');
  }
}

const pers = new Person();
console.log(pers);
