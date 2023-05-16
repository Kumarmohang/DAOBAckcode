/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proposals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      leadName: {
        field: 'lead_name',
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      contactEmail: {
        field: 'contact_email',
        type: Sequelize.STRING,
        allowNull: false,
      },
      organisationWebsite: {
        field: 'organisation_website',
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      currentStatus: {
        field: 'current_status',
        type: Sequelize.ENUM('created', 'ongoing', 'completed', 'failed'),
        defaultValue: 'created',
      },
      proposalSnapshotIdentifier: {
        field: 'proposal_snapshot_identifier',
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      tags: {
        type: Sequelize.STRING,
      },
      background: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.TEXT,
      },
      requiredFunding: {
        field: 'required_funding',
        type: Sequelize.INTEGER,
      },
      fundingCurrency: {
        field: 'funding_currency',
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      patentStatus: {
        field: 'patent_status',
        type: Sequelize.ENUM('filed', 'pending', 'received', 'not filed'),
      },
      startDate: {
        field: 'start_date',
        type: Sequelize.DATE,
      },
      endDate: {
        field: 'end_date',
        type: Sequelize.DATE,
      },
      stage: {
        type: Sequelize.STRING,
      },
      snapshotUrl:{
        field: 'snapshot_url',
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('proposals');
  },
};
