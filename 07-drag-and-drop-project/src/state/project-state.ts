namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
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

  export const projectState = ProjectState.instance;
}
