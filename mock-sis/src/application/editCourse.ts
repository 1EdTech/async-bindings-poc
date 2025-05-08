import { CourseRepository } from '../domain/courseRepository';
import { Course } from '../domain/course';

export class EditCourseUseCase {
  constructor(
    private repo: CourseRepository,
    private notifyCourseUpdate: (course: Course) => void
  ) {}

  async execute(course: Course): Promise<void> {
    await this.repo.edit(course);
    this.notifyCourseUpdate(course);
  }
} 