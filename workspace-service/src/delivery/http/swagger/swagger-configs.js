exports.config = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Workspaces Service',
      description: 'Image uploading and retrieving service',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schema: ['http'],
    consumes: ['multipart/form-data'],
    produces: ['application/json'],
    tags: [
      { name: 'Workspaces', description: 'Workspaces endpoints to create and consult information' }
    ]
  },
  exposeRoute: true
}
