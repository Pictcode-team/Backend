const { images: { verifyImageType } } = require('../../../useCases')
module.exports = function fileFilter (request, file, cb) {
  return cb(null, verifyImageType(file))
}
