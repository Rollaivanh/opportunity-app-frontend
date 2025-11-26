export interface Company {
  id: number;
  name: string;
  description?: string | null;
  location?: string | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type OpportunityStatus =
  | "SENT"
  | "UNDER_REVIEW"
  | "INTERVIEW"
  | "REJECTED"
  | "ACCEPTED";

export interface Opportunity {
  id: number;
  position: string;
  status: OpportunityStatus;
  source?: string | null;
  description?: string | null;
  notes?: string | null;
  link?: string | null;
  createdAt: string;

  // Relaciones
  userId: number;
  companyId?: number | null;

  user?: User;
  company?: Company;
}
export interface Simulation {
  id: number;
  type: string;
  interviewer_rol: string;
  notes: string | null;
  opportunityId: number;
  agentId: number | null;
  retellSessionId?: string | null;
  createdAt: string;
  updatedAt: string;
}
