"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            console.log('user input', title, description, people);
            this.clearInputs();
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
        return [enteredTitle, enteredDescription, +enteredPeople];
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
//# sourceMappingURL=app.js.map