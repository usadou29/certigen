export type Formation = {
  id: string;
  name: string;
  description: string;
  skillsDescription: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
};

export type FormationPayload = Omit<Formation, 'id'>;
