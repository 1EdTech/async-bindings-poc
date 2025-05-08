import { Course } from './course';

export interface CourseRepository {
  getAll(): Promise<Course[]>;
  add(course: Course): Promise<void>;
  edit(course: Course): Promise<void>;
  getRandom(): Promise<Course | undefined>;
  getCount(): Promise<number>;
  clearAll(): Promise<void>;
} 