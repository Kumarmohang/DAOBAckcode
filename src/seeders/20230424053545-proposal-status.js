/* eslint-disable require-jsdoc */
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('proposal_status', [
      {
        id: '4365756f-c715-4434-a060-24f674a14fdb',
        proposal_id: '9e9d20f2-7270-4425-ab4b-81c101fc0bb1',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'failed',
      },
      {
        id: 'e75e0698-f031-496e-a4b8-fed216ff0ba0',
        proposal_id: '72b4b30b-d423-4881-9840-2b224da0b996',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'completed',
      },
      {
        id: '4676b670-89ad-4db2-b5b7-5529ba6a7861',
        proposal_id: '2b6943ad-0d84-4a42-bf78-5601d5cfdef1',
        start_date: '1970-01-20T02:58:48.163Z',
        end_date: '1970-01-20T02:58:48.163Z',
        status: 'ongoing',
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
    await queryInterface.bulkDelete('proposal_status', null, {
      truncate: true,
      cascade: true,
    });
  },
};
