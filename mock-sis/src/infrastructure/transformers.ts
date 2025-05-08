import { Person as DomainPerson } from '../domain/person';
import { Course as DomainCourse } from '../domain/course';
import * as generated from '../generated/sis';

export function dbPersonToProtoPerson(dbPerson: DomainPerson): generated.Person {
  return {
    sourcedId: dbPerson.sourcedId,
    otherIdentifiers: [],
    recordLanguage: dbPerson.recordLanguage,
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
    recordStatus: dbPerson.recordStatus,
    extensions: '',
  };
}

export function dbCourseToProtoCourse(dbCourse: DomainCourse): generated.Course {
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