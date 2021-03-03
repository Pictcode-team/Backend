const { WORKSPACE_PORT } = require('../../../config')
const Fastify = require('fastify')
const app = Fastify({ logger: true })

app.get('/', async (request, reply) => {
  return { test: 'OK' }
})

app.listen(WORKSPACE_PORT, '0.0.0.0', function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server running on ${address}`)
})
