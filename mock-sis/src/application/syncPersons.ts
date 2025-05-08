import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';

export class SyncPersonsUseCase {
  constructor(private repo: PersonRepository) {}

  async execute(): Promise<Person[]> {
    return this.repo.getAll();
  }
} 