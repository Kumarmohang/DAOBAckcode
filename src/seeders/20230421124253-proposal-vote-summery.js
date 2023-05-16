/* eslint-disable require-jsdoc */
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('vote_summary', [
      {
        id: '754e1606-a61e-49d6-9f6d-9eb4c8042020',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'filed',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '629885e9-b9e9-4fb1-996c-34fe791f7bbb',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'filed',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '36b70f8b-df5a-4ebb-a17c-11e3e28f6157',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'filed',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('vote_summary', null, {
      truncate: true,
      cascade: true,
    });
  },
};
