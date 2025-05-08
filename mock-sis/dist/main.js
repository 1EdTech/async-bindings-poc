"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const grpcServer_1 = require("./adapters/grpcServer");
const commands_1 = require("./adapters/commands");
(0, grpcServer_1.startGrpcServer)();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 100
});
async function printCounts() {
    const { personCount, courseCount } = await (0, commands_1.getCounts)();
    console.log(`Persons: ${personCount}   Courses: ${courseCount}`);
}
async function main() {
    console.log('Mock SIS Console');
    while (true) {
        await printCounts();
        const cmd = await new Promise(resolve => rl.question('> ', resolve));
        if (cmd === 'add_person') {
            const p = await (0, commands_1.addPerson)();
            console.log(`Added person: ${p.formattedName}`);
        }
        else if (cmd === 'add_persons') {
            const n = parseInt(await new Promise(resolve => rl.question('How many persons to add? ', resolve)), 10);
            const people = await (0, commands_1.addPersons)(n);
            console.log(`Added ${people.length} persons.`);
        }
        else if (cmd === 'add_course') {
            const c = await (0, commands_1.addCourse)();
            console.log(`Added course: ${JSON.parse(c.title)[0].value}`);
        }
        else if (cmd === 'add_courses') {
            const n = parseInt(await new Promise(resolve => rl.question('How many courses to add? ', resolve)), 10);
            const courses = await (0, commands_1.addCourses)(n);
            console.log(`Added ${courses.length} courses.`);
        }
        else if (cmd === 'edit_person') {
            const p = await (0, commands_1.editRandomPerson)();
            if (p)
                console.log(`Edited person: ${p.formattedName}`);
            else
                console.log('No person to edit.');
        }
        else if (cmd === 'edit_course') {
            const c = await (0, commands_1.editRandomCourse)();
            if (c)
                console.log(`Edited course: ${JSON.parse(c.title)[0].value}`);
            else
                console.log('No course to edit.');
        }
        else if (cmd === 'add_agent') {
            const a = await (0, commands_1.addAgent)();
            if (a)
                console.log(`Added agent relationship: ${a.agentId} is agent for ${a.personId}`);
            else
                console.log('Need at least 2 persons to add agent.');
        }
        else if (cmd === 'clear_all') {
            await (0, commands_1.clearAllData)();
            console.log('All data cleared.');
        }
        else if (cmd === 'help') {
            console.log('Commands: add_person, add_persons, add_course, add_courses, edit_person, edit_course, add_agent, clear_all, help, quit');
        }
        else if (cmd === 'quit') {
            rl.close();
            break;
        }
        else {
            console.log('Unknown command. Type "help" for commands.');
        }
    }
}
main();
