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
const readlineSync = __importStar(require("readline-sync"));
const commands_1 = require("./commands");
function printCounts() {
    const { personCount, courseCount } = (0, commands_1.getCounts)();
    console.log(`Persons: ${personCount}   Courses: ${courseCount}`);
}
function main() {
    console.log('Mock SIS Console');
    while (true) {
        printCounts();
        const cmd = readlineSync.question('> ').trim();
        if (cmd === 'add_person') {
            const p = (0, commands_1.addPerson)();
            console.log(`Added person: ${p.formattedName}`);
        }
        else if (cmd === 'add_persons') {
            const n = readlineSync.questionInt('How many persons to add? ');
            const people = (0, commands_1.addPersons)(n);
            console.log(`Added ${people.length} persons.`);
        }
        else if (cmd === 'add_course') {
            const c = (0, commands_1.addCourse)();
            console.log(`Added course: ${JSON.parse(c.title)[0].value}`);
        }
        else if (cmd === 'add_courses') {
            const n = readlineSync.questionInt('How many courses to add? ');
            const courses = (0, commands_1.addCourses)(n);
            console.log(`Added ${courses.length} courses.`);
        }
        else if (cmd === 'edit_person') {
            const p = (0, commands_1.editRandomPerson)();
            if (p)
                console.log(`Edited person: ${p.formattedName}`);
            else
                console.log('No person to edit.');
        }
        else if (cmd === 'edit_course') {
            const c = (0, commands_1.editRandomCourse)();
            if (c)
                console.log(`Edited course: ${JSON.parse(c.title)[0].value}`);
            else
                console.log('No course to edit.');
        }
        else if (cmd === 'add_agent') {
            const a = (0, commands_1.addAgent)();
            if (a)
                console.log(`Added agent relationship: ${a.agentId} is agent for ${a.personId}`);
            else
                console.log('Need at least 2 persons to add agent.');
        }
        else if (cmd === 'clear_all') {
            (0, commands_1.clearAllData)();
            console.log('All data cleared.');
        }
        else if (cmd === 'help') {
            console.log('Commands: add_person, add_persons, add_course, add_courses, edit_person, edit_course, add_agent, clear_all, help, quit');
        }
        else if (cmd === 'quit') {
            break;
        }
        else {
            console.log('Unknown command. Type "help" for commands.');
        }
    }
}
main();
