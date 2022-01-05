"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Active"] = "active";
    ProjectStatus["Finished"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Date.now().toString();
    }
}
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new ProjectState();
        }
        return this._instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, people) {
        const newProject = new Project(title, description, people, ProjectStatus.Active);
        console.log(newProject);
        this.projects.push(newProject);
        this.runListeners();
    }
    runListeners() {
        this.listeners.forEach((listenerFn) => listenerFn([...this.projects]));
    }
}
const projectState = ProjectState.instance;
function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
function validate(validatableInput) {
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
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((project) => project.status === this.type);
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        this.assignedProjects.forEach((project) => {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            console.log('project :>> ', project);
            listEl.appendChild(listItem);
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            this.clearInputs();
            projectState.addProject(title, description, people);
        }
    }
    clearInputs() {
        this.element.reset();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = +this.peopleInputElement.value.trim();
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
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
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
console.log(prjInput);
const acrivePrjList = new ProjectList(ProjectStatus.Active);
const finishedPrjList = new ProjectList(ProjectStatus.Finished);
console.log(acrivePrjList, finishedPrjList);
//# sourceMappingURL=app.js.map