/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert('votes', [
      {
        id: '43a2f3fc-4d56-43e2-9ccf-04d94f016cd4',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        public_address: '0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17',
        vote_status: 'going',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: 'b4d53d36-cdb6-4828-8220-a1bae5ff308b',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        public_address: '0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17',
        vote_status: 'going',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '6df2c304-fe7d-473e-9d71-787d3889b170',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        public_address: '0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17',
        vote_status: 'going',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: 'e14369b8-a743-4be0-a4a0-3f664c7c259a',
        proposal_id: '876ababd-3a0f-44fd-88df-e04cbf1757c8',
        public_address: '0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17',
        vote_status: 'going',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
   await queryInterface.bulkDelete('votes', null, {
     truncate: true,
     cascade: true,
   });
  },
};
