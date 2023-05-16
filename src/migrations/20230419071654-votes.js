/* eslint-disable require-jsdoc */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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

      publicAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'public_address',
      },
      voteStatus: {
        type: Sequelize.STRING,
        field: 'vote_status',
      },
      votingPower: {
        type: Sequelize.DOUBLE,
        field: 'voting_power',
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('votes');
  },
};
