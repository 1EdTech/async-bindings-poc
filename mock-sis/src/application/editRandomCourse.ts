import { CourseRepository } from '../domain/courseRepository';
import { Course } from '../domain/course';

export class EditRandomCourseUseCase {
  constructor(
    private repo: CourseRepository,
    private notifyCourseUpdate: (course: Course) => void
  ) {}

  async execute(): Promise<Course | null> {
    const course = await this.repo.getRandom();
    if (!course) return null;
    const parsedTitle = course.title ? JSON.parse(course.title) : [{ recordLanguage: 'en', value: '' }];
    const newTitle = JSON.stringify([{ recordLanguage: 'en', value: 'Updated ' + parsedTitle[0].value }]);
    const updatedCourse = { ...course, title: newTitle, dateLastModified: new Date().toISOString() };
    await this.repo.edit(updatedCourse);
    this.notifyCourseUpdate(updatedCourse);
    return updatedCourse;
  }
} 