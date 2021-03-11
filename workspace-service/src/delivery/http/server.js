'use strict'
const app = require('./app')
const { WORKSPACE_PORT } = require('../../../config')
const { connect: dbConnect } = require('../../lib/db')

async function start () {
  // Db connection
  try {
    await dbConnect(app.log)
    await app.listen(WORKSPACE_PORT, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
  }
}

start()
