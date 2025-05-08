import { PersonRepository } from '../domain/personRepository';

export class AddAgentUseCase {
  constructor(private repo: PersonRepository) {}

  async execute(): Promise<{ personId: string; agentId: string; agentType: string } | null> {
    const people = await this.repo.getRandomPeople(2);
    if (people.length < 2) return null;
    const [person, agent] = people;
    await this.repo.addAgent(person.sourcedId, agent.sourcedId, 'guardian');
    return { personId: person.sourcedId, agentId: agent.sourcedId, agentType: 'guardian' };
  }
} 