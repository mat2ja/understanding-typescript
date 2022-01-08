import { projectState } from '../state/project-state.js';
import { Autobind } from '../decorators/autobind.js';
import { Component } from './base-components.js';
import { Validatable, validate } from '../util/validation.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', 'afterbegin', 'user-input');

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
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    // this works but max wants decorators
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    // this.element.addEventListener('submit', (e) => this.submitHandler(e));
  }

  renderContent(): void {
    throw new Error('Method not implemented.');
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      this.clearInputs();
      projectState.addProject(title, description, people);
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
    return [enteredTitle, enteredDescription, enteredPeople];
  }
}
