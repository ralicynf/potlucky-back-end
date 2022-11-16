'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('events', 'userId')
    await queryInterface.removeColumn('users', 'hosting')
    await queryInterface.removeColumn('users', 'attending')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('events', 'userId', {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    })
    await queryInterface.addColumn('users', 'hosting', {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    })
    await queryInterface.addColumn('users', 'attending', {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    })
  }
}
