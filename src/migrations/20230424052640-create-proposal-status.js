/* eslint-disable require-jsdoc */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proposal_status', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      startDate: {
        field: 'start_date',
        type: Sequelize.DATE,
      },
      endDate: {
        field: 'end_date',
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('completed', 'failed', 'ongoing'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('proposal_status');
  },
};
