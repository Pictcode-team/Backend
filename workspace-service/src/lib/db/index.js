'use strict'
const { Sequelize } = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../../../config')

module.exports = {
  connection: null,
  connect: async (logger) => {
    if (!this.connection) {
      this.connection = new Sequelize({
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        dialect: 'postgres'
      })
    }

    try {
      await this.connection.authenticate()
      logger.info('Connection to database succesfully')
      return this.connection
    } catch (err) {
      logger.error(err)
      process.exit(1)
    }
  }
}
