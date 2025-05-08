import * as readlineSync from 'readline-sync';
import { addPerson, addPersons, addCourse, addCourses, editRandomPerson, editRandomCourse, addAgent, getCounts, clearAllData } from './commands';

function printCounts() {
  const { personCount, courseCount } = getCounts();
  console.log(`Persons: ${personCount}   Courses: ${courseCount}`);
}

function main() {
  console.log('Mock SIS Console');
  while (true) {
    printCounts();
    const cmd = readlineSync.question('> ').trim();
    if (cmd === 'add_person') {
      const p = addPerson();
      console.log(`Added person: ${p.formattedName}`);
    } else if (cmd === 'add_persons') {
      const n = readlineSync.questionInt('How many persons to add? ');
      const people = addPersons(n);
      console.log(`Added ${people.length} persons.`);
    } else if (cmd === 'add_course') {
      const c = addCourse();
      console.log(`Added course: ${JSON.parse(c.title)[0].value}`);
    } else if (cmd === 'add_courses') {
      const n = readlineSync.questionInt('How many courses to add? ');
      const courses = addCourses(n);
      console.log(`Added ${courses.length} courses.`);
    } else if (cmd === 'edit_person') {
      const p = editRandomPerson();
      if (p) console.log(`Edited person: ${p.formattedName}`);
      else console.log('No person to edit.');
    } else if (cmd === 'edit_course') {
      const c = editRandomCourse();
      if (c) console.log(`Edited course: ${JSON.parse(c.title)[0].value}`);
      else console.log('No course to edit.');
    } else if (cmd === 'add_agent') {
      const a = addAgent();
      if (a) console.log(`Added agent relationship: ${a.agentId} is agent for ${a.personId}`);
      else console.log('Need at least 2 persons to add agent.');
    } else if (cmd === 'clear_all') {
      clearAllData();
      console.log('All data cleared.');
    } else if (cmd === 'help') {
      console.log('Commands: add_person, add_persons, add_course, add_courses, edit_person, edit_course, add_agent, clear_all, help, quit');
    } else if (cmd === 'quit') {
      break;
    } else {
      console.log('Unknown command. Type "help" for commands.');
    }
  }
}

main(); 