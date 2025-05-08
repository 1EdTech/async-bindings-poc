"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const infra = __importStar(require("../infrastructure"));
const usecases = __importStar(require("../application"));
const grpcServer_1 = require("./grpcServer");
const personRepo = new infra.SqlitePersonRepository();
const courseRepo = new infra.SqliteCourseRepository();
const useCase = {
    addPerson: new usecases.AddPersonUseCase(personRepo, grpcServer_1.notifyPersonUpdate),
    addPersons: new usecases.AddPersonsUseCase(personRepo, grpcServer_1.notifyPersonUpdate),
    addCourse: new usecases.AddCourseUseCase(courseRepo, grpcServer_1.notifyCourseUpdate),
    addCourses: new usecases.AddCoursesUseCase(courseRepo, grpcServer_1.notifyCourseUpdate),
    editRandomPerson: new usecases.EditRandomPersonUseCase(personRepo, grpcServer_1.notifyPersonUpdate),
    editRandomCourse: new usecases.EditRandomCourseUseCase(courseRepo, grpcServer_1.notifyCourseUpdate),
    addAgent: new usecases.AddAgentUseCase(personRepo),
    clearAllData: new usecases.ClearAllDataUseCase(personRepo, courseRepo),
    getCounts: new usecases.GetCountsUseCase(personRepo, courseRepo),
};
async function addPerson() {
    const person = infra.randomPerson();
    await useCase.addPerson.execute(person);
    return person;
}
async function addPersons(count) {
    const people = [];
    for (let i = 0; i < count; i++) {
        people.push(infra.randomPerson());
    }
    await useCase.addPersons.execute(people);
    return people;
}
async function addCourse() {
    const course = infra.randomCourse();
    await useCase.addCourse.execute(course);
    return course;
}
async function addCourses(count) {
    const courses = [];
    for (let i = 0; i < count; i++) {
        courses.push(infra.randomCourse());
    }
    await useCase.addCourses.execute(courses);
    return courses;
}
async function clearAllData() {
    await useCase.clearAllData.execute();
    (0, grpcServer_1.notifyPersonReset)('All person data cleared, please reSync');
    (0, grpcServer_1.notifyCourseReset)('All course data cleared, please reSync');
}
async function editRandomPerson() {
    return await useCase.editRandomPerson.execute();
}
async function editRandomCourse() {
    return await useCase.editRandomCourse.execute();
}
async function addAgent() {
    return await useCase.addAgent.execute();
}
async function getCounts() {
    return await useCase.getCounts.execute();
}
