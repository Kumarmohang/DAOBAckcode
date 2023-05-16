/* eslint-disable prettier/prettier */
export interface VoteSummary {
  id: string;
  proposalId: string;
  votingStrategy: string;
  totalVotes: string;
  voteYes: number;
  voteNo: number;
  voteAbstain: number;
  quorum: number;
  startDate: Date;
  endDate: Date;
  status:string;
  createdAt: Date;
  updatedAt: Date;
}
