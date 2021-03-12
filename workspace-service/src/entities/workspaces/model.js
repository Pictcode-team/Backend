'use strict'
module.exports = function (sequelize, DataTypes) {
  const WorkSpace = sequelize.define('workspaces', {
    identifier: {
      type: DataTypes.UUID,
      allowNull: false
    },
    workspacename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { sequelize, timestamps: true })
  return WorkSpace
}
