/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vote_summary', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      proposalId: {
        field: 'proposal_id',
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'proposals',
          key: 'id',
        },
      },

      votingStrategy: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'voting_strategy',
        defaultValue:'staking-erc20-getBalance-of',
      },
      totalVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'total_votes',
      },
      voteYes: {
        type: Sequelize.INTEGER,
        field: 'vote_yes',
        allowNull: false,
      },
      voteNo: {
        field: 'vote_no',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      voteAbstain: {
        type: Sequelize.INTEGER,
        field: 'vote_abstain',
        allowNull: false,
      },
      quorum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:10000,
      },
      startDate: {
        type: Sequelize.DATE,
        field: 'start_date',
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'end_date',
      },
      status: {
        type: Sequelize.ENUM('passed', 'failed', 'active', 'not active'),
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('vote_summary');
  },
};
