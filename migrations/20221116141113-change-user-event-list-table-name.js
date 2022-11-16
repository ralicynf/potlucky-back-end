'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('userEventLists', 'user_event_list')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('user_event_list', 'userEventLists')
  }
}
