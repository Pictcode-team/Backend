'use strict'
const WorkspaceModel = require('../entities/workspace.model')
module.exports = {
  Images: {
    verifyImageType: require('./images/verify-image'),
    uploadImages: require('./images/upload-images')
  },
  WorkSpaces: {
    createWorkspace: require('./workspaces/create-workspace')(WorkspaceModel)
  }
}
