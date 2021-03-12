'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images, WorkSpaces } = require('../../../useCases')
const s3Storage = require('../../../lib/s3/storage')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
    try {
      // const uploadProcess = await Images.uploadImages(s3Storage())(req.files, req.body.uuid)
      const workspaceCreation = await WorkSpaces.createWorkspace(req.body.uuid)
      console.log(workspaceCreation)
      return { uuid: req.body.uuid }
    } catch (err) {
      console.error(err)
      reply.status(500)
    }
  })
}

module.exports = workspacesRoutes
