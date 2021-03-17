'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images, WorkSpaces } = require('../../../useCases')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  fastify.post('/', { preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
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

  const getWorkspaceInfoSchema = { schema: { params: { type: 'object', required: ['uuid'], properties: { uuid: { type: 'string' } } } } }
  fastify.get('/:uuid', getWorkspaceInfoSchema, async (req, reply) => {
    console.log(req.params?.uuid)
    const results = await WorkSpaces.retrieveInformation(req.params?.uuid)
    return results
  })
}

module.exports = workspacesRoutes
