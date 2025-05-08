"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPerson = randomPerson;
exports.randomCourse = randomCourse;
const uuid_1 = require("uuid");
const faker_1 = require("@faker-js/faker");
function randomPerson() {
    const firstName = faker_1.faker.person.firstName();
    const lastName = faker_1.faker.person.lastName();
    const sourcedId = (0, uuid_1.v4)();
    return {
        sourcedId,
        recordLanguage: 'en',
        recordStatus: 'active',
        legalName: JSON.stringify({ given: firstName, family: lastName }),
        formattedName: `${firstName} ${lastName}`,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        dateOfBirth: faker_1.faker.date.birthdate({ min: 1970, max: 2000, mode: 'year' }).toISOString().slice(0, 10),
        primaryEmail: JSON.stringify({ email: faker_1.faker.internet.email({ firstName, lastName }) }),
        dateLastModified: new Date().toISOString(),
    };
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
function generateCourseTitle() {
    const subject = faker_1.faker.helpers.arrayElement([
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Philosophy', 'Economics',
        'Psychology', 'Sociology', 'Art', 'Music', 'Literature', 'Engineering', 'Business', 'Education', 'Political Science', 'Statistics', 'Geography', 'Environmental Science'
    ]);
    const type = faker_1.faker.helpers.arrayElement([
        'Introduction to', 'Advanced', 'Fundamentals of', 'Principles of', 'Seminar in', 'Topics in', 'Survey of', 'Essentials of', 'Applied', 'Theory of'
    ]);
    const suffix = faker_1.faker.helpers.arrayElement(['I', 'II', '101', '201', '301', 'Lab', 'Workshop', 'Honors', 'Capstone', 'Practicum', '']);
    let title = `${type} ${subject}`;
    if (suffix && Math.random() > 0.5)
        title += ` ${suffix}`;
    return toTitleCase(title.trim());
}
function randomCourse() {
    const title = generateCourseTitle();
    const sourcedId = (0, uuid_1.v4)();
    return {
        sourcedId,
        courseType: faker_1.faker.helpers.arrayElement(['standard', 'honors', 'seminar', 'practicum']),
        recordLanguage: 'en',
        recordStatus: 'active',
        title: JSON.stringify([{ recordLanguage: 'en', value: title }]),
        description: JSON.stringify([{ recordLanguage: 'en', value: `A course about ${title}` }]),
        primaryCode: JSON.stringify({ identifier: `C-${faker_1.faker.number.int({ min: 100, max: 999 })}`, identifierType: 'systemId' }),
        level: faker_1.faker.helpers.arrayElement(['undergraduate', 'graduate']),
        creditType: faker_1.faker.helpers.arrayElement(['credit', 'nonCredit']),
        creditsAwarded: `${faker_1.faker.number.int({ min: 1, max: 5 })}`,
        gradingScheme: JSON.stringify({ recordLanguage: 'en', value: 'A-F' }),
        teachingLanguage: 'en',
        organization: 'MyOrg',
        dateLastModified: new Date().toISOString(),
    };
}
