/* eslint-disable require-jsdoc */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert('vote_summary', [
      {
        id: 'f8dd236a-8a5c-41ab-a976-7a9357eab6f7',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '2023-05-14T02:58:48.163Z',
        end_date: '2023-05-21T02:58:48.163Z',
        status: 'active',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: 'ee930e42-4085-41ea-8b9c-42a3c4d2a4ef',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '2022-05-14T02:58:48.163Z',
        end_date: '2022-05-21T02:58:48.163Z',
        status: 'passed',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '066601bc-4cb9-4cbc-a360-0596a853846d',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '2021-05-14T02:58:48.163Z',
        end_date: '2021-05-21T02:58:48.163Z',
        status: 'failed',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '87c8bf8b-f7d7-4cdd-bf76-adc085a97221',
        proposal_id: '876ababd-3a0f-44fd-88df-e04cbf1757c8',
        voting_strategy: 'staking-erc20-getBalance-of',
        total_votes: '20000',
        vote_yes: '15000',
        vote_no: '5000',
        vote_abstain: '5000',
        quorum: '25000',
        start_date: '2023-05-30T02:58:48.163Z',
        end_date: '2023-06-07T02:58:48.163Z',
        status: 'not active',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('vote_summary', null, {
      truncate: true,
      cascade: true,
    });
  },
};
