import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import * as Validation from '../util/validation';
import Component from './base-components';

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

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    const formIsValid = [
      titleValidatable,
      descriptionValidatable,
      peopleValidatable,
    ].every(Validation.validate);

    if (!formIsValid) {
      return alert('Invalid input, please try again!');
    }
    return [enteredTitle, enteredDescription, enteredPeople];
  }
}
