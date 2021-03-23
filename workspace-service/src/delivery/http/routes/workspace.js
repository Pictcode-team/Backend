'use strict'
const { MAX_IMAGES } = require('../../../../config')
const { Images, WorkSpaces } = require('../../../useCases')
const multer = require('fastify-multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: require('../utils/file-filter') })

async function workspacesRoutes (fastify, options) {
  const createWorkspaceSchema = {
    description: 'Upload images and create a new workspace',
    tags: ['Workspaces'],
    response: {
      201: {
        description: 'Succesfully created',
        type: 'object',
        properties: {
          uuid: { type: 'string', format: 'uuid' }
        }
      }
    }
  }

  fastify.post('/', { schema: createWorkspaceSchema, preHandler: upload.array('images', MAX_IMAGES) }, async (req, reply) => {
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

  const getWorkspaceInfoSchema = {
    schema: {
      description: 'Retrieve information about workspaces',
      tags: ['Workspaces'],
      params: {
        type: 'object',
        required: ['uuid'],
        properties: { uuid: { type: 'string', format: 'uuid' } }
      },
      response: {
        200: {
          description: 'Returns a complete workspace with the images',
          type: 'object',
          properties: {
            identifier: { type: 'string', format: 'uuid' },
            workspacename: { type: 'string' },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Response when the workspace has expired',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.get('/:uuid', getWorkspaceInfoSchema, async (req, reply) => {
    console.log(req.params?.uuid)
    const results = await WorkSpaces.retrieveInformation(req.params?.uuid)
    if (results.expired) {
      reply.code(404)
      return { message: 'workspace expired' }
    }
    return results
  })
}

module.exports = workspacesRoutes
