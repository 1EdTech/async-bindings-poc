"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPerson = addPerson;
exports.addPersons = addPersons;
exports.addCourse = addCourse;
exports.addCourses = addCourses;
exports.clearAllData = clearAllData;
exports.editRandomPerson = editRandomPerson;
exports.editRandomCourse = editRandomCourse;
exports.addAgent = addAgent;
exports.getCounts = getCounts;
const db_1 = __importDefault(require("./db"));
const mockData_1 = require("./mockData");
function addPerson() {
    const person = (0, mockData_1.randomPerson)();
    const stmt = db_1.default.prepare(`
    INSERT INTO person (sourcedId, recordLanguage, recordStatus, legalName, formattedName, gender, dateOfBirth, primaryEmail, dateLastModified)
    VALUES (@sourcedId, @recordLanguage, @recordStatus, @legalName, @formattedName, @gender, @dateOfBirth, @primaryEmail, @dateLastModified)
  `);
    stmt.run(person);
    return person;
}
function addPersons(count) {
    const people = [];
    for (let i = 0; i < count; i++) {
        people.push(addPerson());
    }
    return people;
}
function addCourse() {
    const course = (0, mockData_1.randomCourse)();
    const stmt = db_1.default.prepare(`
    INSERT INTO course (sourcedId, courseType, recordLanguage, recordStatus, title, description, primaryCode, level, creditType, creditsAwarded, gradingScheme, teachingLanguage, organization, dateLastModified)
    VALUES (@sourcedId, @courseType, @recordLanguage, @recordStatus, @title, @description, @primaryCode, @level, @creditType, @creditsAwarded, @gradingScheme, @teachingLanguage, @organization, @dateLastModified)
  `);
    stmt.run(course);
    return course;
}
function addCourses(count) {
    const courses = [];
    for (let i = 0; i < count; i++) {
        courses.push(addCourse());
    }
    return courses;
}
function clearAllData() {
    db_1.default.exec('DELETE FROM person_agent;');
    db_1.default.exec('DELETE FROM person;');
    db_1.default.exec('DELETE FROM course;');
}
function editRandomPerson() {
    const person = db_1.default.prepare('SELECT * FROM person ORDER BY RANDOM() LIMIT 1').get();
    if (!person)
        return null;
    // Randomly change the formattedName and dateLastModified
    const newName = person.formattedName + ' Jr.';
    db_1.default.prepare('UPDATE person SET formattedName = ?, dateLastModified = ? WHERE sourcedId = ?')
        .run(newName, new Date().toISOString(), person.sourcedId);
    return { ...person, formattedName: newName };
}
function editRandomCourse() {
    const course = db_1.default.prepare('SELECT * FROM course ORDER BY RANDOM() LIMIT 1').get();
    if (!course)
        return null;
    // Randomly change the title and dateLastModified
    const newTitle = JSON.stringify([{ recordLanguage: 'en', value: 'Updated ' + JSON.parse(course.title)[0].value }]);
    db_1.default.prepare('UPDATE course SET title = ?, dateLastModified = ? WHERE sourcedId = ?')
        .run(newTitle, new Date().toISOString(), course.sourcedId);
    return { ...course, title: newTitle };
}
function addAgent() {
    // Pick two random persons
    const people = db_1.default.prepare('SELECT sourcedId FROM person ORDER BY RANDOM() LIMIT 2').all();
    if (people.length < 2)
        return null;
    const [person, agent] = people;
    db_1.default.prepare('INSERT OR IGNORE INTO person_agent (personId, agentId, agentType) VALUES (?, ?, ?)')
        .run(person.sourcedId, agent.sourcedId, 'guardian');
    return { personId: person.sourcedId, agentId: agent.sourcedId, agentType: 'guardian' };
}
function getCounts() {
    const personCount = db_1.default.prepare('SELECT COUNT(*) as count FROM person').get().count;
    const courseCount = db_1.default.prepare('SELECT COUNT(*) as count FROM course').get().count;
    return { personCount, courseCount };
}
