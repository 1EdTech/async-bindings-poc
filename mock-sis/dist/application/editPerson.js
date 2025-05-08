"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPersonUseCase = void 0;
class EditPersonUseCase {
    constructor(repo, notifyPersonUpdate) {
        this.repo = repo;
        this.notifyPersonUpdate = notifyPersonUpdate;
    }
    async execute(person) {
        await this.repo.edit(person);
        this.notifyPersonUpdate(person);
    }
}
exports.EditPersonUseCase = EditPersonUseCase;
