export interface Person {
  sourcedId: string;
  recordLanguage: string;
  recordStatus: string;
  legalName?: string; // JSON string
  formattedName?: string;
  gender?: string;
  dateOfBirth?: string;
  primaryEmail?: string; // JSON string
  primaryPhone?: string; // JSON string
  primaryAddress?: string; // JSON string
  dateLastModified?: string;
}

export interface PersonAgent {
  personId: string;
  agentId: string;
  agentType: string;
}

export interface Course {
  sourcedId: string;
  courseType: string;
  recordLanguage: string;
  recordStatus: string;
  title: string; // JSON string
  description: string; // JSON string
  primaryCode: string; // JSON string
  level?: string;
  creditType?: string;
  creditsAwarded?: string;
  gradingScheme?: string; // JSON string
  teachingLanguage?: string;
  organization: string;
  dateLastModified?: string;
} 