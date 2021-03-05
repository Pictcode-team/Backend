const { MAX_IMAGES } = require('../../../../config')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
    return { uploaded: true }
  })
}

module.exports = workspacesRoutes
