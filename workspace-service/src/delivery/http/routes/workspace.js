'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images, WorkSpaces } = require('../../../useCases')
const { createWorkspaceSchema, getWorkspaceSchema } = require('../route-schemas/workspaces')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', {
    schema: createWorkspaceSchema,
    preHandler: upload.array('images', Number.parseInt(MAX_IMAGES))
  },
  async (req, reply) => {
    const workspace = await WorkSpaces.createWorkspace()
    const uploadProcess = await Images.uploadImages(req?.files, workspace.uuid)
    const registerImagesDb = await Images.storeImages(workspace.workspaceId, uploadProcess)
    if (registerImagesDb) {
      reply.code(201)
      return { uuid: workspace.uuid }
    }
    reply.code(500)
    return { error: 'Images records where partially created' }
  })

  fastify.get('/:uuid', {
    schema: getWorkspaceSchema
  }, async (req, reply) => {
    const results = await WorkSpaces.retrieveInformation(req.params?.uuid)
    if (results.expired) {
      reply.code(404)
      return { message: 'workspace expired' }
    }
    return results
  })
}

module.exports = workspacesRoutes
