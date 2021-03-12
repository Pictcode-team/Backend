'use strict'
const app = require('./app')
const { WORKSPACE_PORT } = require('../../../config')
const db = require('../../lib/db')

async function start () {
  try {
    // Db connection
    // await db.authenticate()
    app.log.info('App connected to db')
    await app.listen(WORKSPACE_PORT, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
  }
}

start()
