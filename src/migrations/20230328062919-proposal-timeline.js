/* eslint-disable require-jsdoc */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proposal_timeline', {
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

      title: {
        type: Sequelize.STRING,
      },
      requiredFunding: {
        field: 'required_funding',
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('proposal_timeline');
  },
};
