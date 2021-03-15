'use strict'
const { DataTypes } = require('sequelize')
const sequelize = require('../lib/db')

const Image = sequelize.define('images', {
  imageId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workspaceId: {
    type: DataTypes.INTEGER
  }
}, { sequelize, timestamps: true, freezeTableName: true })

module.exports = Image
