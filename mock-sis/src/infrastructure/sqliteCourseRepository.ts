import { CourseRepository } from '../domain/courseRepository';
import { Course } from '../domain/course';
import db from './db';

export class SqliteCourseRepository implements CourseRepository {
  async getAll(): Promise<Course[]> {
    return db.prepare('SELECT * FROM course').all() as Course[];
  }
  async add(course: Course): Promise<void> {
    db.prepare(`
      INSERT INTO course (sourcedId, courseType, recordLanguage, recordStatus, title, description, primaryCode, level, creditType, creditsAwarded, gradingScheme, teachingLanguage, organization, dateLastModified)
      VALUES (@sourcedId, @courseType, @recordLanguage, @recordStatus, @title, @description, @primaryCode, @level, @creditType, @creditsAwarded, @gradingScheme, @teachingLanguage, @organization, @dateLastModified)
    `).run(course);
  }
  async edit(course: Course): Promise<void> {
    db.prepare(`
      UPDATE course SET courseType = @courseType, recordLanguage = @recordLanguage, recordStatus = @recordStatus, title = @title, description = @description, primaryCode = @primaryCode, level = @level, creditType = @creditType, creditsAwarded = @creditsAwarded, gradingScheme = @gradingScheme, teachingLanguage = @teachingLanguage, organization = @organization, dateLastModified = @dateLastModified
      WHERE sourcedId = @sourcedId
    `).run(course);
  }
  async getRandom(): Promise<Course | undefined> {
    return db.prepare('SELECT * FROM course ORDER BY RANDOM() LIMIT 1').get() as Course | undefined;
  }
  async getCount(): Promise<number> {
    return (db.prepare('SELECT COUNT(*) as count FROM course').get() as { count: number }).count;
  }
  async clearAll(): Promise<void> {
    db.exec('DELETE FROM course;');
  }
} 