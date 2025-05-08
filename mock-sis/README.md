# mock-sis: EduAPI Producer (Proof of Concept)

This directory contains `mock-sis`, a mock implementation of an **EduAPI Producer** for the EduAPI Async Proof of Concept. It streams SIS (Student Information System) data over gRPC to demonstrate async data delivery to Consumers.

## Purpose
- Acts as a Producer in the EduAPI async PoC
- Streams Person and Course events over gRPC
- Provides a test data source for Consumer implementations (see `consumers/`)

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

## Running the Producer

Start the mock-sis Producer (default: gRPC server on `localhost:50051`):

```sh
npm start
```

For development with live TypeScript reload:
```sh
npm run dev
```

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