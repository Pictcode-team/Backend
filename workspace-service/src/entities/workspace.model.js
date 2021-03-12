'use strict'
const { DataTypes } = require('sequelize')
const Image = require('./image.model')
const sequelize = require('../lib/db')

const Workspace = sequelize.define('workspaces', {
  workspaceId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  identifier: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },
  workspacename: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, timestamps: true, freezeTableName: true })
Workspace.hasMany(Image, { foreignKey: 'workspaceId' })
Image.belongsTo(Workspace, { foreignKey: 'workspaceId' })

module.exports = Workspace
