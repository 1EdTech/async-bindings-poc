import * as infra from '../infrastructure';
import * as domain from '../domain';
import * as usecases from '../application';
import { notifyPersonUpdate, notifyCourseUpdate, notifyPersonReset, notifyCourseReset } from './grpcServer';

const personRepo = new infra.SqlitePersonRepository();
const courseRepo = new infra.SqliteCourseRepository();

const useCase = {
  addPerson: new usecases.AddPersonUseCase(personRepo, notifyPersonUpdate),
  addPersons: new usecases.AddPersonsUseCase(personRepo, notifyPersonUpdate),
  addCourse: new usecases.AddCourseUseCase(courseRepo, notifyCourseUpdate),
  addCourses: new usecases.AddCoursesUseCase(courseRepo, notifyCourseUpdate),
  editRandomPerson: new usecases.EditRandomPersonUseCase(personRepo, notifyPersonUpdate),
  editRandomCourse: new usecases.EditRandomCourseUseCase(courseRepo, notifyCourseUpdate),
  addAgent: new usecases.AddAgentUseCase(personRepo),
  clearAllData: new usecases.ClearAllDataUseCase(personRepo, courseRepo),
  getCounts: new usecases.GetCountsUseCase(personRepo, courseRepo),
};

export async function addPerson() {
  const person = infra.randomPerson();
  await useCase.addPerson.execute(person);
  return person;
}

export async function addPersons(count: number) {
  const people: domain.Person[] = [];
  for (let i = 0; i < count; i++) {
    people.push(infra.randomPerson());
  }
  await useCase.addPersons.execute(people);
  return people;
}

export async function addCourse() {
  const course = infra.randomCourse();
  await useCase.addCourse.execute(course);
  return course;
}

export async function addCourses(count: number) {
  const courses: domain.Course[] = [];
  for (let i = 0; i < count; i++) {
    courses.push(infra.randomCourse());
  }
  await useCase.addCourses.execute(courses);
  return courses;
}

export async function clearAllData() {
  await useCase.clearAllData.execute();
  notifyPersonReset('All person data cleared, please reSync');
  notifyCourseReset('All course data cleared, please reSync');
}

export async function editRandomPerson() {
  return await useCase.editRandomPerson.execute();
}

export async function editRandomCourse() {
  return await useCase.editRandomCourse.execute();
}

export async function addAgent() {
  return await useCase.addAgent.execute();
}

export async function getCounts() {
  return await useCase.getCounts.execute();
} 