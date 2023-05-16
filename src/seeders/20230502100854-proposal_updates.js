/* eslint-disable require-jsdoc */
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('proposal_updates', [
      {
        id: '4365756f-c715-4434-a060-24f674a14fdb',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Link',
        title: 'abc',
        description: 'cwcercveve',
        created_at: '1970-01-20T02:58:48.163Z',
        updated_at: '1980-01-20T02:58:48.163Z',
      },
      {
        id: '5365756f-c715-4434-a060-24f674a14fdb',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Link',
        title: 'lmn',
        description: 'f4g5tgh4n',
        created_at: '1970-01-20T02:58:48.163Z',
        updated_at: '1980-01-20T02:58:48.163Z',
      },
      {
        id: '6365756f-c715-4434-a060-24f674a14fdb',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        timestamp: '1970-01-20T02:58:48.163Z',
        asset_url: 'https://www.youtube.com/watch?v=bRJ70hvHW0Y',
        asset_type: 'Link',
        title: 'xyz',
        description: 'hgd3edffj',
        created_at: '1970-01-20T02:58:48.163Z',
        updated_at: '1980-01-20T02:58:48.163Z',
      },
    ]);
  },
  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('proposal_updates', null, {
      truncate: true,
      cascade: true,
    });
  },
};

// id | proposal_id | timestamp | asset_url | asset_type | title | description | created_at | updated_at
