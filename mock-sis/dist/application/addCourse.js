"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCourseUseCase = void 0;
class AddCourseUseCase {
    constructor(repo, notifyCourseUpdate) {
        this.repo = repo;
        this.notifyCourseUpdate = notifyCourseUpdate;
    }
    async execute(course) {
        await this.repo.add(course);
        this.notifyCourseUpdate(course);
    }
}
exports.AddCourseUseCase = AddCourseUseCase;
