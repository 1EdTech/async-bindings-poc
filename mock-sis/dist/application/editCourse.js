"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCourseUseCase = void 0;
class EditCourseUseCase {
    constructor(repo, notifyCourseUpdate) {
        this.repo = repo;
        this.notifyCourseUpdate = notifyCourseUpdate;
    }
    async execute(course) {
        await this.repo.edit(course);
        this.notifyCourseUpdate(course);
    }
}
exports.EditCourseUseCase = EditCourseUseCase;
