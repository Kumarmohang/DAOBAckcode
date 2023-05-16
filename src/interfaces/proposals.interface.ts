export interface Proposal {
  id: string;
  title: string;
  leadName: string;
  userId: string;
  contactEmail: string;
  currentStatus: string;
  proposalSnapshotIdentifier: string;
  organisationWebsite: string;
  body: string;
  summary: string;
  tags: Array<string>;
  background: string;
  type: string;
  requiredFunding: number;
  fundingCurrency: string;
  area: string;
  patentStatus: string;
  startDate: Date;
  endDate: Date;
  stage: string;
  snapshotUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
