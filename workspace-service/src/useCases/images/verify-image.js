const allowedTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'image/svg+xml']
const verifyImageType = (image) => {
  if (!image || !image.mimetype) {
    throw new Error('Image object invalid')
  }

  if (allowedTypes.includes(image.mimetype)) {
    return true
  }
  return false
}

module.exports = verifyImageType
