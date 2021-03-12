const { DataTypes } = require('sequelize')
const Workspace = require('./workspaces/model')
const Image = require('./images/model')
module.exports = function (sequelize) {
  const workspace = Workspace(sequelize, DataTypes)
  const images = Image(sequelize, DataTypes)

  async function sync () {
    await sequelize.sync({ alter: true })
  }

  return {
    Workspace: workspace,
    Image: images,
    sync
  }
}
