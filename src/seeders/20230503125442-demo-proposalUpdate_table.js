/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('proposal_updates', [
      {
        id: '4540482f-a89e-4fc6-b309-5e5ebd1f8428',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        title: 'IP-NFT Transfer Ceremony with Molecule & ApoptoSENS',
        description:
          'The vote has passed, the decision is made: ApoptoSENS will be the 5th research organisation to fund their longevity research via an IP-NFT.',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Software',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '20251b34-4b6d-4e52-9ac0-8780df14c354',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        title: 'IP-NFT Transfer Ceremony with Molecule & ApoptoSENS',
        description:
          'The vote has passed, the decision is made: ApoptoSENS will be the 5th research organisation to fund their longevity research via an IP-NFT.',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Software',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '1c0a3436-233c-45d9-82cf-971168156a79',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        title: 'IP-NFT Transfer Ceremony with Molecule & ApoptoSENS',
        description:
          'The vote has passed, the decision is made: ApoptoSENS will be the 5th research organisation to fund their longevity research via an IP-NFT.',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Software',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        id: '23326b48-bad2-4e6a-9c5c-2a85acf80c29',
        proposal_id: '876ababd-3a0f-44fd-88df-e04cbf1757c8',
        title: 'IP-NFT Transfer Ceremony with Molecule & ApoptoSENS',
        description:
          'The vote has passed, the decision is made: ApoptoSENS will be the 5th research organisation to fund their longevity research via an IP-NFT.',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Software',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('proposal_updates', null, {
      truncate: true,
      cascade: true,
    });
  },
};
