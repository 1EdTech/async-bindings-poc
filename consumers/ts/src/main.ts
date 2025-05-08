
import { credentials } from '@grpc/grpc-js';
import { SISSyncClient, SyncRequest, SyncEvent, Person, Course } from './generated/sis';

// In-memory stores
const persons: Person[] = [];
const courses: Course[] = [];

// gRPC client setup (adjust address/port as needed)
const client = new SISSyncClient(
  'localhost:50051', // Change if your mock-sis server runs elsewhere
  credentials.createInsecure()
);

function syncPersons() {
  const stream = client.syncPersons({ filter: '' });
  stream.on('data', (event: SyncEvent) => {
    if (event.person) {
      persons.push(event.person);
      logEvent(`Received person: ${event.person.sourcedId}`);
      displayCounts();
    } else if (event.reset) {
      persons.length = 0;
      logEvent(`[RESET] Persons: ${event.reset.reason}`);
      displayCounts();
    }
  });
  stream.on('end', () => logEvent('Person stream ended'));
  stream.on('error', (err) => logEvent(`Person stream error: ${err}`));
}

function syncCourses() {
  const stream = client.syncCourses({ filter: '' });
  stream.on('data', (event: SyncEvent) => {
    if (event.course) {
      courses.push(event.course);
      logEvent(`Received course: ${event.course.sourcedId}`);
      displayCounts();
    } else if (event.reset) {
      courses.length = 0;
      logEvent(`[RESET] Courses: ${event.reset.reason}`);
      displayCounts();
    }
  });
  stream.on('end', () => logEvent('Course stream ended'));
  stream.on('error', (err) => logEvent(`Course stream error: ${err}`));
}

function displayCounts() {
  console.log(`Persons: ${persons.length}, Courses: ${courses.length}`);
}

function logEvent(event: string) {
  console.log(`[EVENT] ${event}`);
}

function main() {
  logEvent('Consumer started');
  syncPersons();
  syncCourses();
}

main(); 