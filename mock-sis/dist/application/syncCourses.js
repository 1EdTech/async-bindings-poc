"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncCoursesUseCase = void 0;
class SyncCoursesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.getAll();
    }
}
exports.SyncCoursesUseCase = SyncCoursesUseCase;
