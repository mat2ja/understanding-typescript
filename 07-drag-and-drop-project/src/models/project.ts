namespace App {
  export enum ProjectStatus {
    Active = 'active',
    Finished = 'finished',
  }

  export class Project {
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
}
