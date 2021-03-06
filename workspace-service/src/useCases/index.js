const UploadImages = require('./images/upload-images')

module.exports = {
  images: {
    verifyImageType: require('./images/verify-image'),
    uploadImages: UploadImages({ upload: true })
  }
}
