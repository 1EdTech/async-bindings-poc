import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';

export class EditRandomPersonUseCase {
  constructor(
    private repo: PersonRepository,
    private notifyPersonUpdate: (person: Person) => void
  ) {}

  async execute(): Promise<Person | null> {
    const person = await this.repo.getRandom();
    if (!person) return null;
    const newName = (person.formattedName || '') + ' Jr.';
    const updatedPerson = { ...person, formattedName: newName, dateLastModified: new Date().toISOString() };
    await this.repo.edit(updatedPerson);
    this.notifyPersonUpdate(updatedPerson);
    return updatedPerson;
  }
} 