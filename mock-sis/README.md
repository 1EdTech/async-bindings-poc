# mock-sis: EduAPI Producer (Proof of Concept)

This directory contains `mock-sis`, a mock implementation of an **EduAPI Producer** for the EduAPI Async Proof of Concept. It streams SIS (Student Information System) data over gRPC to demonstrate async data delivery to Consumers.

## Purpose
- Acts as a Producer in the EduAPI async PoC
- Streams Person and Course events over gRPC
- Provides a test data source for Consumer implementations (see `consumers/`)
- Available as a web application and/ or a console cli app.

## Prerequisites
- Node.js (v18+ recommended)

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build the project:**
   ```sh
   npm run build
   ```

## Running the Producer (console)

Start the mock-sis Producer

```sh
npm start
```

For development with live TypeScript reload:
```sh
npm run dev
```

## Web Demo

Alernatively, you can run as a web version of the mock SIS for more interactive demos.

### Start the Web UI

```sh
npm run web
```

- This starts both the gRPC server (for consumers) and the web server (for your browser) in a single process.
- The web UI will be available at [http://localhost:3000](http://localhost:3000).
- No credentials are required.

### Features
- Large dashboard for live demos
- Add Students and Courses with a single click
- See real-time counts and lists of all demo data
- Clear all data instantly
- Connect your own remote systems as consumers to see real-time updates

### For Developers & Integrators
- The gRPC server is available on port 50051 for remote consumers
- The web UI is ideal for showing non-technical stakeholders how async updates work

## Features
- Generates and streams mock Person and Course data
- Supports commands for adding, editing, and clearing data
- All data is generated with realistic mock values

## Notes
- Data is stored in a local SQLite file (`mock-sis.db`)
- The schema is based on the EduAPI JSON Schemas for Person and Course
- Intended for development and demonstration only

---

For more about the project and the async PoC, see the [main README](../README.md). 