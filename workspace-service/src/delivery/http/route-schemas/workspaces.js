module.exports = {
  createWorkspaceSchema: {
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
  },
  getWorkspaceSchema: {
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
