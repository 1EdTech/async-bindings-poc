"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCoursesUseCase = void 0;
class AddCoursesUseCase {
    constructor(repo, notifyCourseUpdate) {
        this.repo = repo;
        this.notifyCourseUpdate = notifyCourseUpdate;
    }
    async execute(courses) {
        for (const course of courses) {
            await this.repo.add(course);
            this.notifyCourseUpdate(course);
        }
    }
}
exports.AddCoursesUseCase = AddCoursesUseCase;
