import readline from 'readline';
import { startGrpcServer } from './adapters/grpcServer';
import { addPerson, addPersons, addCourse, addCourses, editRandomPerson, editRandomCourse, addAgent, getCounts, clearAllData } from './adapters/commands';

startGrpcServer();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  historySize: 100
});

async function printCounts() {
  const { personCount, courseCount } = await getCounts();
  console.log(`Persons: ${personCount}   Courses: ${courseCount}`);
}

async function main() {
  console.log('Mock SIS Console');
  while (true) {
    await printCounts();
    const cmd = await new Promise<string>(resolve => rl.question('> ', resolve));
    if (cmd === 'add_person') {
      const p = await addPerson();
      console.log(`Added person: ${p.formattedName}`);
    } else if (cmd === 'add_persons') {
      const n = parseInt(await new Promise<string>(resolve => rl.question('How many persons to add? ', resolve)), 10);
      const people = await addPersons(n);
      console.log(`Added ${people.length} persons.`);
    } else if (cmd === 'add_course') {
      const c = await addCourse();
      console.log(`Added course: ${JSON.parse(c.title)[0].value}`);
    } else if (cmd === 'add_courses') {
      const n = parseInt(await new Promise<string>(resolve => rl.question('How many courses to add? ', resolve)), 10);
      const courses = await addCourses(n);
      console.log(`Added ${courses.length} courses.`);
    } else if (cmd === 'edit_person') {
      const p = await editRandomPerson();
      if (p) console.log(`Edited person: ${p.formattedName}`);
      else console.log('No person to edit.');
    } else if (cmd === 'edit_course') {
      const c = await editRandomCourse();
      if (c) console.log(`Edited course: ${JSON.parse(c.title)[0].value}`);
      else console.log('No course to edit.');
    } else if (cmd === 'add_agent') {
      const a = await addAgent();
      if (a) console.log(`Added agent relationship: ${a.agentId} is agent for ${a.personId}`);
      else console.log('Need at least 2 persons to add agent.');
    } else if (cmd === 'clear_all') {
      await clearAllData();
      console.log('All data cleared.');
    } else if (cmd === 'help') {
      console.log('Commands: add_person, add_persons, add_course, add_courses, edit_person, edit_course, add_agent, clear_all, help, quit');
    } else if (cmd === 'quit') {
      rl.close();
      break;
    } else {
      console.log('Unknown command. Type "help" for commands.');
    }
  }
}

main(); 