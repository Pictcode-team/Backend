'use strict'
module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, timestamps: true })
  return Image
}
