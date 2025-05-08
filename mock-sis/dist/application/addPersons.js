"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPersonsUseCase = void 0;
class AddPersonsUseCase {
    constructor(repo, notifyPersonUpdate) {
        this.repo = repo;
        this.notifyPersonUpdate = notifyPersonUpdate;
    }
    async execute(people) {
        for (const person of people) {
            await this.repo.add(person);
            this.notifyPersonUpdate(person);
        }
    }
}
exports.AddPersonsUseCase = AddPersonsUseCase;
