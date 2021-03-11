'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images } = require('../../../useCases')
const s3Storage = require('../../../lib/s3/storage')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
    const uploadProcess = await Images.uploadImages(s3Storage())(req.files, req.body.uuid)
    console.log(uploadProcess)
    return { uuid: '3e3e2l3.23.23-2-3-23' }
  })
}

module.exports = workspacesRoutes
