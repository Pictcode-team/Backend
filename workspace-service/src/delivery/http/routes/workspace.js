const { MAX_IMAGES } = require('../../../../config')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })
const fs = require('fs')


async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
    console.log(req.files)
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i]
      const data = file.buffer
      fs.writeFile(file.originalname, data, 'base64', (err) => {
        if (err) throw err;
        console.log('Salvado')
      })
    }
    return { uuid: '3e3e2l3.23.23-2-3-23' }
  })
}

module.exports = workspacesRoutes
