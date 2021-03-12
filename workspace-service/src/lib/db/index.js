'use strict'
const { Sequelize } = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../../../config')

async function connection () {
  const connection = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'postgres'
  })
  try {
    await connection.authenticate()
    console.log('Connection to database succesfully')
    return connection
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connection
