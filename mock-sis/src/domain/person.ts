export interface Person {
  sourcedId: string;
  recordLanguage: string;
  recordStatus: string;
  legalName?: string;
  formattedName?: string;
  gender?: string;
  dateOfBirth?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  primaryAddress?: string;
  dateLastModified?: string;
}

export interface PersonAgent {
  personId: string;
  agentId: string;
  agentType: string;
} 