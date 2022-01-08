"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus["Active"] = "active";
        ProjectStatus["Finished"] = "finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(title, description, people, status) {
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
            this.id = Date.now().toString();
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new ProjectState();
            }
            return this._instance;
        }
        addProject(title, description, people) {
            const newProject = new App.Project(title, description, people, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.findProject(projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            this.listeners.forEach((listenerFn) => listenerFn([...this.projects]));
        }
        findProject(projectId) {
            return this.projects.find(({ id }) => id === projectId);
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.instance;
})(App || (App = {}));
var App;
(function (App) {
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
    App.Autobind = Autobind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class Component {
        constructor(templateId, hostId, insertPosition, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertPosition);
        }
        attach(where) {
            this.hostElement.insertAdjacentElement(where, this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', 'afterbegin', 'user-input');
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() {
            throw new Error('Method not implemented.');
        }
        submitHandler(e) {
            e.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                this.clearInputs();
                App.projectState.addProject(title, description, people);
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
            ].every(App.validate);
            if (!formIsValid) {
                return alert('Invalid input, please try again!');
            }
            return [enteredTitle, enteredDescription, enteredPeople];
        }
    }
    __decorate([
        App.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, 'beforeend', project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            const peopleCount = this.project.people;
            return peopleCount === 1 ? '1 person' : `${peopleCount} people`;
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) { }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons;
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        App.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', 'beforeend', `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.listEl = this.element.querySelector('ul');
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                this.listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(projectId, this.type);
            this.listEl.classList.remove('droppable');
        }
        dragLeaveHandler(_) {
            this.listEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((project) => project.status === this.type);
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            this.assignedProjects.forEach((project) => new App.ProjectItem(listEl.id, project));
        }
    }
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList(App.ProjectStatus.Active);
    new App.ProjectList(App.ProjectStatus.Finished);
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map