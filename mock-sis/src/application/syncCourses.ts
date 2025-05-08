import { CourseRepository } from '../domain/courseRepository';
import { Course } from '../domain/course';

export class SyncCoursesUseCase {
  constructor(private repo: CourseRepository) {}

  async execute(): Promise<Course[]> {
    return this.repo.getAll();
  }
} 