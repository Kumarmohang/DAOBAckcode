/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(45),
      },
      publicAddress: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: 'public_address',
      },
      firstname: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      lastname: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      nonce: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: () => Math.floor(Math.random() * 1000000), // Initialize with a random nonce
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
