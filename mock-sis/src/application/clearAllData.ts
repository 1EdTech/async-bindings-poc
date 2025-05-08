import { PersonRepository } from '../domain/personRepository';
import { CourseRepository } from '../domain/courseRepository';

export class ClearAllDataUseCase {
  constructor(private personRepo: PersonRepository, private courseRepo: CourseRepository) {}

  async execute(): Promise<void> {
    await this.personRepo.clearAll();
    await this.courseRepo.clearAll();
  }
} 