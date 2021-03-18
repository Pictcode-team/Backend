'use strict'
const { Sequelize } = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../../../config')

let connection = null
if (!connection) {
  connection = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'postgres'
  })
}
connection.sync({ alter: true })

module.exports = connection
