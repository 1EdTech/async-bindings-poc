import { Person, Course } from './models';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function generateCourseTitle(): string {
  // Use faker to generate a subject and a course type/level
  const subject = faker.helpers.arrayElement([
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Philosophy', 'Economics',
    'Psychology', 'Sociology', 'Art', 'Music', 'Literature', 'Engineering', 'Business', 'Education', 'Political Science', 'Statistics', 'Geography', 'Environmental Science'
  ]);
  const type = faker.helpers.arrayElement([
    'Introduction to', 'Advanced', 'Fundamentals of', 'Principles of', 'Seminar in', 'Topics in', 'Survey of', 'Essentials of', 'Applied', 'Theory of'
  ]);
  const suffix = faker.helpers.arrayElement(['I', 'II', '101', '201', '301', 'Lab', 'Workshop', 'Honors', 'Capstone', 'Practicum', '']);
  let title = `${type} ${subject}`;
  if (suffix && Math.random() > 0.5) title += ` ${suffix}`;
  return toTitleCase(title.trim());
}

const courseTypes = ['standard', 'honors', 'seminar', 'practicum'];
const levels = ['undergraduate', 'graduate'];
const creditTypes = ['credit', 'nonCredit'];

export function randomPerson(): Person {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const sourcedId = uuidv4();
  return {
    sourcedId,
    recordLanguage: 'en',
    recordStatus: 'active',
    legalName: JSON.stringify({ given: firstName, family: lastName }),
    formattedName: `${firstName} ${lastName}`,
    gender: Math.random() > 0.5 ? 'male' : 'female',
    dateOfBirth: faker.date.birthdate({ min: 1970, max: 2000, mode: 'year' }).toISOString().slice(0, 10),
    primaryEmail: JSON.stringify({ email: faker.internet.email({ firstName, lastName }) }),
    dateLastModified: new Date().toISOString(),
  };
}

export function randomCourse(): Course {
  const title = generateCourseTitle();
  const sourcedId = uuidv4();
  return {
    sourcedId,
    courseType: faker.helpers.arrayElement(['standard', 'honors', 'seminar', 'practicum']),
    recordLanguage: 'en',
    recordStatus: 'active',
    title: JSON.stringify([{ recordLanguage: 'en', value: title }]),
    description: JSON.stringify([{ recordLanguage: 'en', value: `A course about ${title}` }]),
    primaryCode: JSON.stringify({ identifier: `C-${faker.number.int({ min: 100, max: 999 })}`, identifierType: 'systemId' }),
    level: faker.helpers.arrayElement(['undergraduate', 'graduate']),
    creditType: faker.helpers.arrayElement(['credit', 'nonCredit']),
    creditsAwarded: `${faker.number.int({ min: 1, max: 5 })}`,
    gradingScheme: JSON.stringify({ recordLanguage: 'en', value: 'A-F' }),
    teachingLanguage: 'en',
    organization: 'MyOrg',
    dateLastModified: new Date().toISOString(),
  };
} 