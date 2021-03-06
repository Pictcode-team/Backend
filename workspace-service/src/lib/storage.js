const { AWS_S3_REGION, AWS_S3_BUCKET } = require('../../config')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

let s3Instance = null
module.exports = function s3Storage () {
  function connect () {
    if (s3Instance) {
      return s3Instance
    }
    s3Instance = new S3Client({ region: AWS_S3_REGION })
    return s3Instance
  }

  async function uploadBuffer (image) {
    if (!image.originalname || typeof (image.originalname) !== 'string') {
      throw new Error('Image does not have originalname property')
    }

    if (!image.buffer || !Buffer.isBuffer(image.buffer)) {
      throw new Error('Image does not have buffer property')
    }

    if (!image.mimetype || typeof (image.mimetype) !== 'string') {
      throw new Error('Image does not have mimetype property')
    }
    const s3 = connect()
    const objectOpts = { Bucket: AWS_S3_BUCKET, Key: `${image.originalname}`, Body: image.buffer }
    const result = await s3.putObject(new PutObjectCommand(objectOpts))
    console.lor(result)
    return result
  }

  return {
    uploadBuffer
  }
}
