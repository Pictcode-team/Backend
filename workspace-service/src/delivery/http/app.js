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

module.exports = app
