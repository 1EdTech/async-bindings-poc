"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPersonsUseCase = void 0;
class SyncPersonsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.getAll();
    }
}
exports.SyncPersonsUseCase = SyncPersonsUseCase;
