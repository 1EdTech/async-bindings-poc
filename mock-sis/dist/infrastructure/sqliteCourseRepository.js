"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteCourseRepository = void 0;
const db_1 = __importDefault(require("./db"));
class SqliteCourseRepository {
    async getAll() {
        return db_1.default.prepare('SELECT * FROM course').all();
    }
    async add(course) {
        db_1.default.prepare(`
      INSERT INTO course (sourcedId, courseType, recordLanguage, recordStatus, title, description, primaryCode, level, creditType, creditsAwarded, gradingScheme, teachingLanguage, organization, dateLastModified)
      VALUES (@sourcedId, @courseType, @recordLanguage, @recordStatus, @title, @description, @primaryCode, @level, @creditType, @creditsAwarded, @gradingScheme, @teachingLanguage, @organization, @dateLastModified)
    `).run(course);
    }
    async edit(course) {
        db_1.default.prepare(`
      UPDATE course SET courseType = @courseType, recordLanguage = @recordLanguage, recordStatus = @recordStatus, title = @title, description = @description, primaryCode = @primaryCode, level = @level, creditType = @creditType, creditsAwarded = @creditsAwarded, gradingScheme = @gradingScheme, teachingLanguage = @teachingLanguage, organization = @organization, dateLastModified = @dateLastModified
      WHERE sourcedId = @sourcedId
    `).run(course);
    }
    async getRandom() {
        return db_1.default.prepare('SELECT * FROM course ORDER BY RANDOM() LIMIT 1').get();
    }
    async getCount() {
        return db_1.default.prepare('SELECT COUNT(*) as count FROM course').get().count;
    }
    async clearAll() {
        db_1.default.exec('DELETE FROM course;');
    }
}
exports.SqliteCourseRepository = SqliteCourseRepository;
