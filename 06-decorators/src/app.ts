function Logger(logString: string) {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return (constructor: any) => {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// @Logger(' LOGGING - PERSON')
@WithTemplate('<h1>Matija was here</h1>', 'app')
class Person {
  name = 'Satoshi';

  constructor() {
    console.log('Creating person object....');
  }
}

const pers = new Person();
console.log(pers);
