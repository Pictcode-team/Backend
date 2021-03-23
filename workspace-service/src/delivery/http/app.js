const Fastify = require('fastify')
const helmet = require('fastify-helmet')
const cors = require('fastify-cors')
const swaggerConfigs = require('./swagger/swagger-configs')
const { contentParser: multerMultipart } = require('fastify-multer')

const app = Fastify({ logger: true })

// Fastify plugins
app.register(require('fastify-swagger'), swaggerConfigs.config)
app.register(cors)
app.register(helmet, {
  contentSecurityPolicy: false
})
app.register(multerMultipart)

// App plugins
app.register(require('./routes/workspace'))

module.exports = app
