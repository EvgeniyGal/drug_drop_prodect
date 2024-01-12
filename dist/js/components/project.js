export var ProjectStates;
(function (ProjectStates) {
    ProjectStates[ProjectStates["Active"] = 0] = "Active";
    ProjectStates[ProjectStates["Finished"] = 1] = "Finished";
})(ProjectStates || (ProjectStates = {}));
export class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
//# sourceMappingURL=project.js.map