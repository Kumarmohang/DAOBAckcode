/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('proposal_updates', {
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

     timestamp: {
       type: Sequelize.DATE,
     },
     assetUrl: {
       type: Sequelize.STRING,
       field: 'asset_url',
     },
     assetType: {
       type: Sequelize.STRING,
       field: 'asset_type',
     },
     title: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     description: {
       type: Sequelize.TEXT,
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

  async down (queryInterface) {
   await queryInterface.dropTable('proposal_updates');
  }
};
