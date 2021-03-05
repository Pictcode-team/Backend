const allowedTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'image/svg+xml']
const verifyImageType = (image) => {
  if (allowedTypes.contains(image.mimetype)) {
    return true
  }
  return false
}

module.exports = verifyImageType
