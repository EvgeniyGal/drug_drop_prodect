import { ProjectStates, Project } from "../components/project.js";

type Listener<T> = (items: T[]) => void;

class States<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends States<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  addProjects(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStates.Active
    );

    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStates) {
    const curProject = this.projects.find((prj) => prj.id === projectId);
    if (curProject && curProject.status !== newStatus) {
      curProject.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  static getInstance() {
    if (ProjectState.instance) {
      return ProjectState.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
}

export const projectStates = ProjectState.getInstance();
