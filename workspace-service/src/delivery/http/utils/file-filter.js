const allowedMimeTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp', 'image/svg+xml']
module.exports = function fileFilter (request, file, cb) {
  console.log(request.files)
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true)
  }
  return cb(null, false)
}
