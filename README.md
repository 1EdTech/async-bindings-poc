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
