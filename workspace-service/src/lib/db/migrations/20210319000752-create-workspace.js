'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workspaces', {
      workspaceId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      identifier: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      workspacename: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Date.now()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workspaces')
  }
}
