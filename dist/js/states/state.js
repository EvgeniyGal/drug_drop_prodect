import { ProjectStates, Project } from "../components/project.js";
class States {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends States {
    constructor() {
        super();
        this.projects = [];
    }
    addProjects(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStates.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const curProject = this.projects.find((prj) => prj.id === projectId);
        if (curProject && curProject.status !== newStatus) {
            curProject.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    static getInstance() {
        if (ProjectState.instance) {
            return ProjectState.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
}
export const projectStates = ProjectState.getInstance();
//# sourceMappingURL=state.js.map