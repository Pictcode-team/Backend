'use strict'
const { Sequelize } = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../../config')
async function createDb () {
  const db = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'postgres',
    isolationLevel: true
  })

  require('../entities/image.model')
  await db.sync({ alter: true })
}

createDb()
