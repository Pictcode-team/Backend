const { PORT } = require('../../../config')
const Fastify = require('fastify')
const app = Fastify({ logger: true })

app.get('/', async (request, reply) => {
  return { test: 'OK' }
})

app.listen(PORT, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server running on ${address}`)
})
