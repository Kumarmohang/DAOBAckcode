export interface Votes {
  id: string;
  proposalId: string;
  publicAddress: string;
  voteStatus: string;
  votePower: number;
  createdAt: Date;
  updatedAt: Date;
}
