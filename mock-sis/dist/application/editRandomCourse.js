"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRandomCourseUseCase = void 0;
class EditRandomCourseUseCase {
    constructor(repo, notifyCourseUpdate) {
        this.repo = repo;
        this.notifyCourseUpdate = notifyCourseUpdate;
    }
    async execute() {
        const course = await this.repo.getRandom();
        if (!course)
            return null;
        const parsedTitle = course.title ? JSON.parse(course.title) : [{ recordLanguage: 'en', value: '' }];
        const newTitle = JSON.stringify([{ recordLanguage: 'en', value: 'Updated ' + parsedTitle[0].value }]);
        const updatedCourse = { ...course, title: newTitle, dateLastModified: new Date().toISOString() };
        await this.repo.edit(updatedCourse);
        this.notifyCourseUpdate(updatedCourse);
        return updatedCourse;
    }
}
exports.EditRandomCourseUseCase = EditRandomCourseUseCase;
