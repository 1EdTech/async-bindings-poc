"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default('mock-sis.db');
// Person table
db.exec(`
CREATE TABLE IF NOT EXISTS person (
  sourcedId TEXT PRIMARY KEY,
  recordLanguage TEXT NOT NULL,
  recordStatus TEXT NOT NULL,
  legalName TEXT,
  formattedName TEXT,
  gender TEXT,
  dateOfBirth TEXT,
  primaryEmail TEXT,
  primaryPhone TEXT,
  primaryAddress TEXT,
  dateLastModified TEXT
);
`);
// Agent relationship table
db.exec(`
CREATE TABLE IF NOT EXISTS person_agent (
  personId TEXT,
  agentId TEXT,
  agentType TEXT,
  PRIMARY KEY (personId, agentId)
);
`);
// Course table
db.exec(`
CREATE TABLE IF NOT EXISTS course (
  sourcedId TEXT PRIMARY KEY,
  courseType TEXT NOT NULL,
  recordLanguage TEXT NOT NULL,
  recordStatus TEXT NOT NULL,
  title TEXT,
  description TEXT,
  primaryCode TEXT,
  level TEXT,
  creditType TEXT,
  creditsAwarded TEXT,
  gradingScheme TEXT,
  teachingLanguage TEXT,
  organization TEXT NOT NULL DEFAULT 'MyOrg',
  dateLastModified TEXT
);
`);
exports.default = db;
