export interface ProposalTimeline {
  id: string;
  proposalId: string;
  title: string;
  requiredFunding: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
