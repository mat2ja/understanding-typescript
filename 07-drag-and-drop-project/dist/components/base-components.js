export class Component {
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
//# sourceMappingURL=base-components.js.map