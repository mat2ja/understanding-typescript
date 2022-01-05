enum ProjectStatus {
  Active,
  Finished,
}

//* Project Type
class Project {
  id: string;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    this.id = Date.now().toString();
  }
}

//* Project state management
type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static _instance: ProjectState;

  private constructor() {}

  public static get instance() {
    if (!this._instance) {
      this._instance = new ProjectState();
    }
    return this._instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      title,
      description,
      people,
      ProjectStatus.Active
    );
    console.log(newProject);
    this.projects.push(newProject);

    this.runListeners();
  }

  private runListeners() {
    this.listeners.forEach((listenerFn) => listenerFn([...this.projects]));
  }
}

const projectState = ProjectState.instance;

//* Autobind decorator
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

//* Validation
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

//* ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    this.templateElement = document.getElementById(
      'project-list'
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById('app') as HTMLDivElement;

    // create a copy of the node
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${ProjectStatus[this.type].toLowerCase()}-projects`;

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${ProjectStatus[this.type].toLowerCase()}-projects-list`
    ) as HTMLUListElement;

    this.assignedProjects.forEach((project) => {
      const listItem = document.createElement('li');
      listItem.textContent = project.title;
      console.log('project :>> ', project);
      listEl.appendChild(listItem);
    });
  }

  private renderContent() {
    const listId = `${ProjectStatus[this.type].toLowerCase()}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = `${ProjectStatus[
      this.type
    ].toUpperCase()} PROJECTS`;
  }

  private attach() {
    // inject copy to the host element (#root)
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// ProjectInput Class
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
console.log(prjInput);
const acrivePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
console.log(acrivePrjList, finishedPrjList);
