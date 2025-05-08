"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPersonToProtoPerson = dbPersonToProtoPerson;
exports.dbCourseToProtoCourse = dbCourseToProtoCourse;
function dbPersonToProtoPerson(dbPerson) {
    const person = {
        sourcedId: dbPerson.sourcedId || '',
        otherIdentifiers: [],
        recordLanguage: dbPerson.recordLanguage || '',
        legalName: dbPerson.legalName ? JSON.parse(dbPerson.legalName) : undefined,
        formattedName: dbPerson.formattedName || '',
        otherNames: [],
        gender: dbPerson.gender || '',
        pronouns: [],
        languagesSpoken: [],
        dateOfBirth: dbPerson.dateOfBirth || '',
        placeOfBirth: '',
        countryOfBirth: '',
        isDeceased: false,
        dateOfDeath: '',
        primaryEmail: dbPerson.primaryEmail ? JSON.parse(dbPerson.primaryEmail) : undefined,
        otherEmails: [],
        primaryPhone: dbPerson.primaryPhone ? JSON.parse(dbPerson.primaryPhone) : undefined,
        otherPhones: [],
        primaryAddress: dbPerson.primaryAddress ? JSON.parse(dbPerson.primaryAddress) : undefined,
        otherAddresses: [],
        agents: [],
        dateLastModified: dbPerson.dateLastModified || '',
        recordStatus: dbPerson.recordStatus || '',
        extensions: '',
    };
    // Defensive check for undefined string fields
    for (const [key, value] of Object.entries(person)) {
        // Only check string fields
        if (typeof value === 'undefined' && [
            'sourcedId', 'recordLanguage', 'formattedName', 'gender', 'dateOfBirth', 'placeOfBirth', 'countryOfBirth', 'dateOfDeath', 'dateLastModified', 'recordStatus', 'extensions'
        ].includes(key)) {
            console.error(`dbPersonToProtoPerson: Field '${key}' is undefined! dbPerson:`, dbPerson, 'Generated:', person);
        }
    }
    return person;
}
function dbCourseToProtoCourse(dbCourse) {
    return {
        courseType: dbCourse.courseType,
        parent: [],
        sourcedId: dbCourse.sourcedId,
        recordLanguage: dbCourse.recordLanguage,
        title: dbCourse.title ? JSON.parse(dbCourse.title) : [],
        description: dbCourse.description ? JSON.parse(dbCourse.description) : [],
        primaryCode: dbCourse.primaryCode ? JSON.parse(dbCourse.primaryCode) : undefined,
        otherCodes: [],
        organization: dbCourse.organization,
        organizationCode: '',
        level: dbCourse.level || '',
        creditType: dbCourse.creditType || '',
        creditsAwarded: dbCourse.creditsAwarded || '',
        gradingScheme: dbCourse.gradingScheme ? JSON.parse(dbCourse.gradingScheme) : undefined,
        teachingLanguage: dbCourse.teachingLanguage || '',
        recordStatus: dbCourse.recordStatus,
        dateLastModified: dbCourse.dateLastModified || '',
        extensions: '',
    };
}
