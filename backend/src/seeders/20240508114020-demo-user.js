// fake data để test
'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //* copy ten cua table
   await queryInterface.bulkInsert('user', 
   [
      {
        email: 'John Doe1',
        password: '123',
        username: 'fake1',
      },
      {
        email: 'John Doe2',
        password: '123',
        username: 'fake2',
      },
      {
        email: 'John Doe3',
        password: '123',
        username: 'fake3',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
