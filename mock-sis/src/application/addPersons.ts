import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';

export class AddPersonsUseCase {
  constructor(
    private repo: PersonRepository,
    private notifyPersonUpdate: (person: Person) => void
  ) {}

  async execute(people: Person[]): Promise<void> {
    for (const person of people) {
      await this.repo.add(person);
      this.notifyPersonUpdate(person);
    }
  }
} 