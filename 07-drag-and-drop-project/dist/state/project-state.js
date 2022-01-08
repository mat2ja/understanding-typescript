import { Project, ProjectStatus } from '../models/project.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
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
        const newProject = new Project(title, description, people, ProjectStatus.Active);
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
export const projectState = ProjectState.instance;
//# sourceMappingURL=project-state.js.map