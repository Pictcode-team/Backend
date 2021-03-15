'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images, WorkSpaces } = require('../../../useCases')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
    const workspaceCreation = await WorkSpaces.createWorkspace(req.body.uuid)
    if (workspaceCreation) {
      const uploadProcess = await Images.uploadImages(req?.files, req.body?.uuid)
      if (uploadProcess) {
        const registerImagesDb = await Images.storeImages(workspaceCreation, uploadProcess)
        if (registerImagesDb) {
          return { uuid: req.body.uuid }
        }
        reply.status(500)
        return { error: 'Error while creating workspace image relationships' }
      }
      reply.status(500)
      return { error: 'Error while uploading images' }
    }
    reply.status(500)
    return { error: 'Workspace duplicated' }
  })

  const getWorkspaceInfoSchema = { schema: { params: { type: 'object', required: ['uuid'], properties: { uuid: { type: 'string' } } } } }
  fastify.get('/:uuid', getWorkspaceInfoSchema, async (req, reply) => {
    console.log(req.params?.uuid)
    const results = await WorkSpaces.retrieveInformation(req.params?.uuid)
    return results
  })
}

module.exports = workspacesRoutes
