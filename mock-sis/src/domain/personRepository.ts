import { Person } from './person';

export interface PersonRepository {
  getAll(): Promise<Person[]>;
  add(person: Person): Promise<void>;
  edit(person: Person): Promise<void>;
  getRandom(): Promise<Person | undefined>;
  getRandomPeople(count: number): Promise<Person[]>;
  addAgent(personId: string, agentId: string, agentType: string): Promise<void>;
  getCount(): Promise<number>;
  clearAll(): Promise<void>;
} 