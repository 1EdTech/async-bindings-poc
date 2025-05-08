"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPersonUseCase = void 0;
class AddPersonUseCase {
    constructor(repo, notifyPersonUpdate) {
        this.repo = repo;
        this.notifyPersonUpdate = notifyPersonUpdate;
    }
    async execute(person) {
        await this.repo.add(person);
        this.notifyPersonUpdate(person);
    }
}
exports.AddPersonUseCase = AddPersonUseCase;
