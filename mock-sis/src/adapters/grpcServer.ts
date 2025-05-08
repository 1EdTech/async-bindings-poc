import { Server, ServerWritableStream, ServerCredentials } from '@grpc/grpc-js';
import * as generated from '../generated/sis';
import { SqlitePersonRepository } from '../infrastructure/sqlitePersonRepository';
import { SqliteCourseRepository } from '../infrastructure/sqliteCourseRepository';
import { SyncPersonsUseCase } from '../application/syncPersons';
import { SyncCoursesUseCase } from '../application/syncCourses';
import { dbPersonToProtoPerson, dbCourseToProtoCourse } from '../infrastructure/transformers';
import { Person as DomainPerson } from '../domain/person';
import { Course as DomainCourse } from '../domain/course';
import { SyncEvent, SyncReset } from '../generated/sis';

const personRepo = new SqlitePersonRepository();
const courseRepo = new SqliteCourseRepository();
const syncPersons = new SyncPersonsUseCase(personRepo);
const syncCourses = new SyncCoursesUseCase(courseRepo);

const personStreams = new Set<ServerWritableStream<generated.SyncRequest, SyncEvent>>();
const courseStreams = new Set<ServerWritableStream<generated.SyncRequest, SyncEvent>>();

const sisSyncImpl = {
  async syncPersons(call: ServerWritableStream<generated.SyncRequest, SyncEvent>) {
    personStreams.add(call);
    const persons = await syncPersons.execute();
    for (const person of persons) {
      call.write({ person: dbPersonToProtoPerson(person) });
    }
    call.on('cancelled', () => personStreams.delete(call));
    call.on('close', () => personStreams.delete(call));
  },
  async syncCourses(call: ServerWritableStream<generated.SyncRequest, SyncEvent>) {
    courseStreams.add(call);
    const courses = await syncCourses.execute();
    for (const course of courses) {
      call.write({ course: dbCourseToProtoCourse(course) });
    }
    call.on('cancelled', () => courseStreams.delete(call));
    call.on('close', () => courseStreams.delete(call));
  }
};

export function notifyPersonUpdate(person: DomainPerson) {
  const event: SyncEvent = { person: dbPersonToProtoPerson(person) };
  for (const stream of personStreams) {
    stream.write(event);
  }
}

export function notifyCourseUpdate(course: DomainCourse) {
  const event: SyncEvent = { course: dbCourseToProtoCourse(course) };
  for (const stream of courseStreams) {
    stream.write(event);
  }
}

export function notifyPersonReset(reason: string) {
  const resetEvent: SyncEvent = { reset: { reason } };
  for (const stream of personStreams) {
    stream.write(resetEvent);
  }
}

export function notifyCourseReset(reason: string) {
  const resetEvent: SyncEvent = { reset: { reason } };
  for (const stream of courseStreams) {
    stream.write(resetEvent);
  }
}

export function startGrpcServer() {
  const server = new Server();
  server.addService(generated.SISSyncService, sisSyncImpl);
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('gRPC server failed to start:', err);
      return;
    }
    console.log(`gRPC server running on port ${port}`);
  });
} 