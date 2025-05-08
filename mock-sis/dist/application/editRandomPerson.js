"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRandomPersonUseCase = void 0;
class EditRandomPersonUseCase {
    constructor(repo, notifyPersonUpdate) {
        this.repo = repo;
        this.notifyPersonUpdate = notifyPersonUpdate;
    }
    async execute() {
        const person = await this.repo.getRandom();
        if (!person)
            return null;
        const newName = (person.formattedName || '') + ' Jr.';
        const updatedPerson = { ...person, formattedName: newName, dateLastModified: new Date().toISOString() };
        await this.repo.edit(updatedPerson);
        this.notifyPersonUpdate(updatedPerson);
        return updatedPerson;
    }
}
exports.EditRandomPersonUseCase = EditRandomPersonUseCase;
