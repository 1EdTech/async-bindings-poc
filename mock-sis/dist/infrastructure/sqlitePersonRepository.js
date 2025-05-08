"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlitePersonRepository = void 0;
const db_1 = __importDefault(require("./db"));
class SqlitePersonRepository {
    async getAll() {
        return db_1.default.prepare('SELECT * FROM person').all();
    }
    async add(person) {
        db_1.default.prepare(`
      INSERT INTO person (sourcedId, recordLanguage, recordStatus, legalName, formattedName, gender, dateOfBirth, primaryEmail, dateLastModified)
      VALUES (@sourcedId, @recordLanguage, @recordStatus, @legalName, @formattedName, @gender, @dateOfBirth, @primaryEmail, @dateLastModified)
    `).run(person);
    }
    async edit(person) {
        db_1.default.prepare(`
      UPDATE person SET recordLanguage = @recordLanguage, recordStatus = @recordStatus, legalName = @legalName, formattedName = @formattedName, gender = @gender, dateOfBirth = @dateOfBirth, primaryEmail = @primaryEmail, dateLastModified = @dateLastModified
      WHERE sourcedId = @sourcedId
    `).run(person);
    }
    async getRandom() {
        return db_1.default.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT 1').get();
    }
    async getRandomPeople(count) {
        return db_1.default.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT ?').all(count);
    }
    async addAgent(personId, agentId, agentType) {
        db_1.default.prepare('INSERT OR IGNORE INTO person_agent (personId, agentId, agentType) VALUES (?, ?, ?)')
            .run(personId, agentId, agentType);
    }
    async getCount() {
        return db_1.default.prepare('SELECT COUNT(*) as count FROM person').get().count;
    }
    async clearAll() {
        db_1.default.exec('DELETE FROM person_agent;');
        db_1.default.exec('DELETE FROM person;');
    }
}
exports.SqlitePersonRepository = SqlitePersonRepository;
