'use strict'
const app = require('./app')
const { WORKSPACE_PORT } = require('../../../config')
const db = require('../../lib/db')

async function start () {
  // Db connection
  try {
    const dbInstance = await db()
    // Init entities
    const entities = require('../../entities')(dbInstance)
    await entities.sync()
    await app.listen(WORKSPACE_PORT, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
  }
}

start()
