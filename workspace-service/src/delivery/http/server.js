'use strict'
const { WORKSPACE_PORT } = require('../../../config')
const Fastify = require('fastify')
const helmet = require('fastify-helmet')
const cors = require('fastify-cors')
const { contentParser: multerMultipart } = require('fastify-multer')

const app = Fastify({ logger: true })

// Fastify plugins
app.register(cors)
app.register(helmet)
app.register(multerMultipart)

// App plugins
app.register(require('./routes/workspace'))

app.listen(WORKSPACE_PORT, '0.0.0.0', function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server running on ${address}`)
})
