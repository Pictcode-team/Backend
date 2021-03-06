require('dotenv').config()
module.exports = {
  WORKSPACE_PORT: process.env.WORKSPACE_PORT,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  MAX_IMAGES: process.env.MAX_IMAGES
}
