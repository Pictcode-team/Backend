'use strict'
const { AWS_S3_REGION, AWS_S3_BUCKET } = require('../../../config')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

let s3Instance = null
module.exports = function s3Storage () {
  /**
   * This function returns an instance of S3Client
   * @returns {S3Client}
   */
  function connect () {
    if (s3Instance) {
      return s3Instance
    }
    s3Instance = new S3Client({ region: AWS_S3_REGION })
    return s3Instance
  }

  async function upload (image) {
    if (!image.name || typeof (image.name) !== 'string') {
      throw new Error('Image does not have name property')
    }

    if (!image.buffer || !Buffer.isBuffer(image.buffer)) {
      throw new Error('Image does not have buffer property')
    }

    if (!image.mimetype || typeof (image.mimetype) !== 'string') {
      throw new Error('Image does not have mimetype property')
    }

    const s3 = connect()
    const objectOpts = { Bucket: AWS_S3_BUCKET, Key: `${image.uuid}/${image.name}`, Body: image.buffer }
    try {
      await s3.send(new PutObjectCommand(objectOpts))
      return `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${image.uuid}/${image.name}`
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async function get (key) {
    if (typeof key !== 'string' || !key) {
      throw new Error('Key must be a string')
    }

    const s3 = connect()
    const params = { Bucket: AWS_S3_BUCKET, Key: key }
    try {
      const image = await s3.send(new GetObjectCommand(params))
      return image
    } catch (err) {
      console.error(err)
      return err
    }
  }

  return {
    upload,
    get
  }
}
