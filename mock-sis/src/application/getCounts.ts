import { PersonRepository } from '../domain/personRepository';
import { CourseRepository } from '../domain/courseRepository';

export class GetCountsUseCase {
  constructor(private personRepo: PersonRepository, private courseRepo: CourseRepository) {}

  async execute(): Promise<{ personCount: number; courseCount: number }> {
    const personCount = await this.personRepo.getCount();
    const courseCount = await this.courseRepo.getCount();
    return { personCount, courseCount };
  }
} 