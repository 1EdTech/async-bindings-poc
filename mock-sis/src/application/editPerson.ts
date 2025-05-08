import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';

export class EditPersonUseCase {
  constructor(
    private repo: PersonRepository,
    private notifyPersonUpdate: (person: Person) => void
  ) {}

  async execute(person: Person): Promise<void> {
    await this.repo.edit(person);
    this.notifyPersonUpdate(person);
  }
} 