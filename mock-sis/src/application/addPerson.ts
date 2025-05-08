import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';

export class AddPersonUseCase {
  constructor(
    private repo: PersonRepository,
    private notifyPersonUpdate: (person: Person) => void
  ) {}

  async execute(person: Person): Promise<void> {
    await this.repo.add(person);
    this.notifyPersonUpdate(person);
  }
} 