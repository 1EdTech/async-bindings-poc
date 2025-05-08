export interface Course {
  sourcedId: string;
  courseType: string;
  recordLanguage: string;
  recordStatus: string;
  title: string;
  description: string;
  primaryCode: string;
  level?: string;
  creditType?: string;
  creditsAwarded?: string;
  gradingScheme?: string;
  teachingLanguage?: string;
  organization: string;
  dateLastModified?: string;
} 