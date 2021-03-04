const { join } = require('path')
require('dotenv').config({ path: join(__dirname, '/../../.env') })
module.exports = {
  WORKSPACE_PORT: process.env.WORKSPACE_PORT
}
