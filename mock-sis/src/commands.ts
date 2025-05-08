import db from './db';
import { randomPerson, randomCourse } from './mockData';
import { Person, Course } from './models';

export function addPerson(): Person {
  const person = randomPerson();
  const stmt = db.prepare(`
    INSERT INTO person (sourcedId, recordLanguage, recordStatus, legalName, formattedName, gender, dateOfBirth, primaryEmail, dateLastModified)
    VALUES (@sourcedId, @recordLanguage, @recordStatus, @legalName, @formattedName, @gender, @dateOfBirth, @primaryEmail, @dateLastModified)
  `);
  stmt.run(person);
  return person;
}

export function addPersons(count: number): Person[] {
  const people: Person[] = [];
  for (let i = 0; i < count; i++) {
    people.push(addPerson());
  }
  return people;
}

export function addCourse(): Course {
  const course = randomCourse();
  const stmt = db.prepare(`
    INSERT INTO course (sourcedId, courseType, recordLanguage, recordStatus, title, description, primaryCode, level, creditType, creditsAwarded, gradingScheme, teachingLanguage, organization, dateLastModified)
    VALUES (@sourcedId, @courseType, @recordLanguage, @recordStatus, @title, @description, @primaryCode, @level, @creditType, @creditsAwarded, @gradingScheme, @teachingLanguage, @organization, @dateLastModified)
  `);
  stmt.run(course);
  return course;
}

export function addCourses(count: number): Course[] {
  const courses: Course[] = [];
  for (let i = 0; i < count; i++) {
    courses.push(addCourse());
  }
  return courses;
}

export function clearAllData() {
  db.exec('DELETE FROM person_agent;');
  db.exec('DELETE FROM person;');
  db.exec('DELETE FROM course;');
}

export function editRandomPerson() {
  const person = db.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT 1').get() as Person | undefined;
  if (!person) return null;
  // Randomly change the formattedName and dateLastModified
  const newName = person.formattedName + ' Jr.';
  db.prepare('UPDATE person SET formattedName = ?, dateLastModified = ? WHERE sourcedId = ?')
    .run(newName, new Date().toISOString(), person.sourcedId);
  return { ...person, formattedName: newName };
}

export function editRandomCourse() {
  const course = db.prepare('SELECT * FROM course ORDER BY RANDOM() LIMIT 1').get() as Course | undefined;
  if (!course) return null;
  // Randomly change the title and dateLastModified
  const newTitle = JSON.stringify([{ recordLanguage: 'en', value: 'Updated ' + JSON.parse(course.title)[0].value }]);
  db.prepare('UPDATE course SET title = ?, dateLastModified = ? WHERE sourcedId = ?')
    .run(newTitle, new Date().toISOString(), course.sourcedId);
  return { ...course, title: newTitle };
}

export function addAgent() {
  // Pick two random persons
  const people = db.prepare('SELECT sourcedId FROM person ORDER BY RANDOM() LIMIT 2').all() as { sourcedId: string }[];
  if (people.length < 2) return null;
  const [person, agent] = people;
  db.prepare('INSERT OR IGNORE INTO person_agent (personId, agentId, agentType) VALUES (?, ?, ?)')
    .run(person.sourcedId, agent.sourcedId, 'guardian');
  return { personId: person.sourcedId, agentId: agent.sourcedId, agentType: 'guardian' };
}

export function getCounts() {
  const personCount = (db.prepare('SELECT COUNT(*) as count FROM person').get() as { count: number }).count;
  const courseCount = (db.prepare('SELECT COUNT(*) as count FROM course').get() as { count: number }).count;
  return { personCount, courseCount };
} 