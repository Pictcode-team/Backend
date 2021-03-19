'use strict'
const storeImages = (model) => async (workspaceId, images) => {
  if (!workspaceId || !images) {
    throw new Error('Missing parameters')
  }

  if (!Array.isArray(images)) {
    throw new Error('images parameter must be an array')
  }

  if (images.length === 0) {
    throw new Error('images array must contain at least one element')
  }

  for (const image of images) {
    await model.create({ workspaceId: workspaceId, url: image.url })
  }
  return true
}

module.exports = storeImages
