# Mock SIS Console App

## Overview

The `mock-sis` directory contains a console application that acts as a mock Learning SIS (Student Information System) for proof-of-concept and development purposes. It uses a simple SQLite database and generates mock data for persons and courses based on the EduAPI data model.

## Features
- Add, edit, and randomly modify persons and courses
- Add agent relationships between persons
- Bulk add persons or courses
- Clear all data
- All data is generated with realistic mock values using the `@faker-js/faker` library

## Setup

1. **Install dependencies:**
   ```sh
   cd mock-sis
   npm install
   ```

2. **Build the project:**
   ```sh
   npm run build
   ```

3. **Run the console app:**
   ```sh
   npm start
   ```
   Or, for development with live TypeScript:
   ```sh
   npm run dev
   ```

## Usage

When you run the app, you will see the current number of persons and courses. You can enter commands at the prompt:

- `add_person` — Add a single random person
- `add_persons` — Add multiple persons (you will be prompted for a count)
- `add_course` — Add a single random course
- `add_courses` — Add multiple courses (you will be prompted for a count)
- `edit_person` — Randomly edit a person
- `edit_course` — Randomly edit a course
- `add_agent` — Add an agent relationship between two random persons
- `clear_all` — Delete all data from the database
- `help` — Show available commands
- `quit` — Exit the application

## Notes
- All data is stored in a local SQLite file (`mock-sis.db`).
- Course names and person names are generated using the `@faker-js/faker` library for realism.
- The schema is based on the EduAPI JSON Schemas for Person and Course.

---

## Consumers

This project includes example consumers that connect to the mock-sis server via gRPC and synchronize data in memory. These consumers demonstrate how to receive real-time updates of persons and courses from the SIS.

### TypeScript Consumer

A TypeScript console consumer is provided in `consumers/ts`. It connects to the mock-sis gRPC server, receives person and course events, and displays counts and event logs in the console.

#### Setup

1. **Install dependencies:**
   ```sh
   cd consumers/ts
   npm install
   ```

2. **Generate gRPC bindings:**
   ```sh
   npm run proto:generate
   ```
   > This uses the proto file in the root `proto/` directory to generate TypeScript gRPC client code.

3. **Run the consumer:**
   ```sh
   npm run dev
   ```
   > The consumer will connect to the mock-sis server at `localhost:50051` by default. Make sure the mock-sis server is running first.

#### What it does
- Connects to the mock-sis gRPC server
- Receives and displays the number of persons and courses in memory
- Logs each event received (person, course, or reset)
- Does not persist data (in-memory only)

#### Notes
- You can run multiple consumers simultaneously to simulate multiple clients.
- The consumer code is organized using a clean architecture approach (adapters, application, domain, infrastructure, generated).

---
