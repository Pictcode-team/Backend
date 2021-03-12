'use strict'
const s3Storage = require('../lib/s3/storage')
const WorkspaceModel = require('../entities/workspace.model')
const ImagesModel = require('../entities/image.model')

module.exports = {
  Images: {
    verifyImageType: require('./images/verify-image'),
    uploadImages: require('./images/upload-images')(s3Storage()),
    storeImages: require('./images/store-images')(ImagesModel)
  },
  WorkSpaces: {
    createWorkspace: require('./workspaces/create-workspace')(WorkspaceModel),
    retrieveInformation: require('./workspaces/retrieve-information')(WorkspaceModel)
  }
}
