async function workspacesRoutes (fastify, options) {
  fastify.post('/', async (req, reply) => {
    return { ...req.body }
  })
}

module.exports = workspacesRoutes
