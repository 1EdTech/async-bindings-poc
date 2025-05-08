"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPerson = randomPerson;
exports.randomCourse = randomCourse;
const uuid_1 = require("uuid");
const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
const courseTitles = ['Intro to AI', 'Calculus I', 'World History', 'Chemistry', 'Programming 101', 'Art Appreciation'];
const courseTypes = ['standard', 'honors', 'seminar', 'practicum'];
const levels = ['undergraduate', 'graduate'];
const creditTypes = ['credit', 'nonCredit'];
function randomPerson() {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const sourcedId = (0, uuid_1.v4)();
    return {
        sourcedId,
        recordLanguage: 'en',
        recordStatus: 'active',
        legalName: JSON.stringify({ given: firstName, family: lastName }),
        formattedName: `${firstName} ${lastName}`,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        dateOfBirth: `19${70 + Math.floor(Math.random() * 30)}-01-01`,
        primaryEmail: JSON.stringify({ email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com` }),
        dateLastModified: new Date().toISOString(),
    };
}
function randomCourse() {
    const title = courseTitles[Math.floor(Math.random() * courseTitles.length)];
    const sourcedId = (0, uuid_1.v4)();
    return {
        sourcedId,
        courseType: courseTypes[Math.floor(Math.random() * courseTypes.length)],
        recordLanguage: 'en',
        recordStatus: 'active',
        title: JSON.stringify([{ recordLanguage: 'en', value: title }]),
        description: JSON.stringify([{ recordLanguage: 'en', value: `A course about ${title}` }]),
        primaryCode: JSON.stringify({ identifier: `C-${Math.floor(Math.random() * 1000)}`, identifierType: 'systemId' }),
        level: levels[Math.floor(Math.random() * levels.length)],
        creditType: creditTypes[Math.floor(Math.random() * creditTypes.length)],
        creditsAwarded: `${Math.floor(Math.random() * 5) + 1}`,
        gradingScheme: JSON.stringify({ recordLanguage: 'en', value: 'A-F' }),
        teachingLanguage: 'en',
        organization: 'MyOrg',
        dateLastModified: new Date().toISOString(),
    };
}
