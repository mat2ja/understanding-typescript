//* Drag and drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active = 'active',
  Finished = 'finished',
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
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static _instance: ProjectState;

  private constructor() {
    super();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new ProjectState();
    }
    return this._instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.findProject(projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    this.listeners.forEach((listenerFn) => listenerFn([...this.projects]));
  }

  private findProject(projectId: string) {
    return this.projects.find(({ id }) => id === projectId);
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

//* Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertPosition: InsertPosition,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostId) as T;

    // create a copy of the node
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertPosition);
  }

  protected attach(where: InsertPosition) {
    // inject copy to the host element (#root)
    this.hostElement.insertAdjacentElement(where, this.element);
  }

  abstract configure(): void;

  abstract renderContent(): void;
}

//* ProjectItem Class
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    const peopleCount = this.project.people;
    return peopleCount === 1 ? '1 person' : `${peopleCount} people`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, 'beforeend', project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

//* ProjectList Class
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];
  listEl: HTMLUListElement;

  constructor(private type: ProjectStatus) {
    super('project-list', 'app', 'beforeend', `${type}-projects`);
    this.listEl = this.element.querySelector('ul')!;
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      this.listEl.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(projectId, this.type);
    this.listEl.classList.remove('droppable');
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    this.listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(
        (project) => project.status === this.type
      );
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector(
      'h2'
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;

    listEl.innerHTML = '';
    this.assignedProjects.forEach(
      (project) => new ProjectItem(listEl.id, project)
    );
  }
}

//* ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
