import asyncio
import logging
import grpc
from generated import sis_pb2, sis_pb2_grpc

logging.basicConfig(level=logging.INFO, format='[EVENT] %(message)s')

class Store:
    def __init__(self):
        self.persons = []
        self.courses = []

    def display_counts(self):
        logging.info(f"Persons: {len(self.persons)}, Courses: {len(self.courses)}")

async def sync_persons(stub, store: Store):
    request = sis_pb2.SyncRequest(filter="")
    try:
        async for event in stub.SyncPersons(request):
            if event.HasField('person'):
                store.persons.append(event.person)
                logging.info(f"Received person: {event.person.sourcedId}")
                store.display_counts()
            elif event.HasField('reset'):
                store.persons.clear()
                logging.info(f"[RESET] Persons: {event.reset.reason}")
                store.display_counts()
    except grpc.aio.AioRpcError as e:
        logging.info(f"Person stream error: {e}")
    logging.info("Person stream ended")

async def sync_courses(stub, store: Store):
    request = sis_pb2.SyncRequest(filter="")
    try:
        async for event in stub.SyncCourses(request):
            if event.HasField('course'):
                store.courses.append(event.course)
                logging.info(f"Received course: {event.course.sourcedId}")
                store.display_counts()
            elif event.HasField('reset'):
                store.courses.clear()
                logging.info(f"[RESET] Courses: {event.reset.reason}")
                store.display_counts()
    except grpc.aio.AioRpcError as e:
        logging.info(f"Course stream error: {e}")
    logging.info("Course stream ended")

async def main():
    logging.info("Consumer started")
    store = Store()
    async with grpc.aio.insecure_channel('localhost:50051') as channel:
        stub = sis_pb2_grpc.SISSyncStub(channel)
        await asyncio.gather(
            sync_persons(stub, store),
            sync_courses(stub, store)
        )

if __name__ == "__main__":
    asyncio.run(main()) 