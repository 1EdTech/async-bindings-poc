import { PersonRepository } from '../domain/personRepository';
import { Person } from '../domain/person';
import db from './db';

export class SqlitePersonRepository implements PersonRepository {
  async getAll(): Promise<Person[]> {
    return db.prepare('SELECT * FROM person').all() as Person[];
  }
  async add(person: Person): Promise<void> {
    db.prepare(`
      INSERT INTO person (sourcedId, recordLanguage, recordStatus, legalName, formattedName, gender, dateOfBirth, primaryEmail, dateLastModified)
      VALUES (@sourcedId, @recordLanguage, @recordStatus, @legalName, @formattedName, @gender, @dateOfBirth, @primaryEmail, @dateLastModified)
    `).run(person);
  }
  async edit(person: Person): Promise<void> {
    db.prepare(`
      UPDATE person SET recordLanguage = @recordLanguage, recordStatus = @recordStatus, legalName = @legalName, formattedName = @formattedName, gender = @gender, dateOfBirth = @dateOfBirth, primaryEmail = @primaryEmail, dateLastModified = @dateLastModified
      WHERE sourcedId = @sourcedId
    `).run(person);
  }
  async getRandom(): Promise<Person | undefined> {
    return db.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT 1').get() as Person | undefined;
  }
  async getRandomPeople(count: number): Promise<Person[]> {
    return db.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT ?').all(count) as Person[];
  }
  async addAgent(personId: string, agentId: string, agentType: string): Promise<void> {
    db.prepare('INSERT OR IGNORE INTO person_agent (personId, agentId, agentType) VALUES (?, ?, ?)')
      .run(personId, agentId, agentType);
  }
  async getCount(): Promise<number> {
    return (db.prepare('SELECT COUNT(*) as count FROM person').get() as { count: number }).count;
  }
  async clearAll(): Promise<void> {
    db.exec('DELETE FROM person_agent;');
    db.exec('DELETE FROM person;');
  }
} 