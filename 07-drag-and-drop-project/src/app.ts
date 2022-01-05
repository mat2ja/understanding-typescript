// Autobind decorator
function Autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;

  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }

  if (typeof value === 'string') {
    if (minLength != null) {
      isValid = isValid && value.length >= minLength;
    }
    if (maxLength != null) {
      isValid = isValid && value.length <= maxLength;
    }
  }

  if (typeof value === 'number') {
    if (min != null) {
      isValid = isValid && value >= min;
    }
    if (max != null) {
      isValid = isValid && value <= max;
    }
  }
  return isValid;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // create a copy of the node
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // get its child
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log('user input', title, description, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.element.reset();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value.trim();
    const enteredDescription = this.descriptionInputElement.value.trim();
    const enteredPeople = +this.peopleInputElement.value.trim();

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    const formIsValid = [
      titleValidatable,
      descriptionValidatable,
      peopleValidatable,
    ].every(validate);

    if (!formIsValid) {
      return alert('Invalid input, please try again!');
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
    // this works but max wants decorators
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    // this.element.addEventListener('submit', (e) => this.submitHandler(e));
  }

  private attach() {
    // inject copy to the host element (#root)
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
