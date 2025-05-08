import { Person as DomainPerson } from '../domain/person';
import { Course as DomainCourse } from '../domain/course';
import * as generated from '../generated/sis';

function safePersonName(json: string | undefined): generated.PersonName | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    familyName: obj.familyName || obj.family || '',
    givenName: obj.givenName || obj.given || '',
    additionalName: obj.additionalName || '',
    patronymicName: obj.patronymicName || '',
    honorificPrefix: obj.honorificPrefix || '',
    honorificSuffix: obj.honorificSuffix || '',
    familyNamePrefix: obj.familyNamePrefix || '',
  };
}

function safeOptionallyTypedEmail(json: string | undefined): generated.OptionallyTypedEmail | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    emailType: obj.emailType || '',
    email: obj.email || '',
  };
}

function safeOptionallyTypedPhone(json: string | undefined): generated.OptionallyTypedPhone | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    phoneType: obj.phoneType || '',
    phone: obj.phone || '',
  };
}

function safeOptionallyTypedAddress(json: string | undefined): generated.OptionallyTypedAddress | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    addressType: obj.addressType || '',
    addressCountry: obj.addressCountry || '',
    addressCountryCode: obj.addressCountryCode || '',
    addressRegion: obj.addressRegion || '',
    addressLocality: obj.addressLocality || '',
    streetAddress: obj.streetAddress || '',
    postOfficeBoxNumber: obj.postOfficeBoxNumber || '',
    postalCode: obj.postalCode || '',
    geo: obj.geo || undefined,
  };
}

export function dbPersonToProtoPerson(dbPerson: DomainPerson): generated.Person {
  const person: generated.Person = {
    sourcedId: dbPerson.sourcedId || '',
    otherIdentifiers: [],
    recordLanguage: dbPerson.recordLanguage || '',
    legalName: safePersonName(dbPerson.legalName),
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
    primaryEmail: safeOptionallyTypedEmail(dbPerson.primaryEmail),
    otherEmails: [],
    primaryPhone: safeOptionallyTypedPhone(dbPerson.primaryPhone),
    otherPhones: [],
    primaryAddress: safeOptionallyTypedAddress(dbPerson.primaryAddress),
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
      'sourcedId','recordLanguage','formattedName','gender','dateOfBirth','placeOfBirth','countryOfBirth','dateOfDeath','dateLastModified','recordStatus','extensions'
    ].includes(key)) {
      console.error(`dbPersonToProtoPerson: Field '${key}' is undefined! dbPerson:`, dbPerson, 'Generated:', person);
    }
  }
  return person;
}

function safeIdentifierEntry(json: string | undefined): generated.IdentifierEntry | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    identifier: obj.identifier || '',
    identifierType: obj.identifierType || '',
  };
}

function safeLanguageTypedString(json: string | undefined): generated.LanguageTypedString | undefined {
  if (!json) return undefined;
  let obj: any;
  try { obj = JSON.parse(json); } catch { return undefined; }
  return {
    recordLanguage: obj.recordLanguage || '',
    value: obj.value || '',
  };
}

export function dbCourseToProtoCourse(dbCourse: DomainCourse): generated.Course {
  return {
    courseType: dbCourse.courseType || '',
    parent: [],
    sourcedId: dbCourse.sourcedId || '',
    recordLanguage: dbCourse.recordLanguage || '',
    title: dbCourse.title
      ? JSON.parse(dbCourse.title).map(safeLanguageTypedString).filter(Boolean)
      : [],
    description: dbCourse.description
      ? JSON.parse(dbCourse.description).map(safeLanguageTypedString).filter(Boolean)
      : [],
    primaryCode: safeIdentifierEntry(dbCourse.primaryCode),
    otherCodes: [],
    organization: dbCourse.organization || '',
    organizationCode: '',
    level: dbCourse.level || '',
    creditType: dbCourse.creditType || '',
    creditsAwarded: dbCourse.creditsAwarded || '',
    gradingScheme: dbCourse.gradingScheme ? safeLanguageTypedString(dbCourse.gradingScheme) : undefined,
    teachingLanguage: dbCourse.teachingLanguage || '',
    recordStatus: dbCourse.recordStatus || '',
    dateLastModified: dbCourse.dateLastModified || '',
    extensions: '',
  };
} 