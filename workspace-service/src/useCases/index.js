'use strict'
const { Workspace } = require('../entities')

module.exports = {
  Images: {
    verifyImageType: require('./images/verify-image'),
    uploadImages: require('./images/upload-images')
  },
  WorkSpaces: {
    createWorkspace: require('./workspaces/create-workspace')(Workspace)
  }
}
