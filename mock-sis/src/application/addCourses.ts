import { CourseRepository } from '../domain/courseRepository';
import { Course } from '../domain/course';

export class AddCoursesUseCase {
  constructor(
    private repo: CourseRepository,
    private notifyCourseUpdate: (course: Course) => void
  ) {}

  async execute(courses: Course[]): Promise<void> {
    for (const course of courses) {
      await this.repo.add(course);
      this.notifyCourseUpdate(course);
    }
  }
} 