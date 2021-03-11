'use strict'
const uploadImages = (storage) => async (images, uuid) => {
  if (!Array.isArray(images)) {
    throw new Error('Images must be an array')
  }

  if (images.length === 0) {
    throw new Error('Images array must contain 1 or more items')
  }

  if (typeof uuid !== 'string' || !uuid) {
    throw new Error('UUID must be a string')
  }

  for (const image of images) {
    image.name = `${uuid}-${image.originalname}`
    image.uuid = uuid
    try {
      await storage.upload(image)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = uploadImages
