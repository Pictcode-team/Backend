const { validate: validateUUID } = require('uuid')
module.exports = (model) => async (uuid, workspacename) => {
  if (!uuid) {
    throw new Error('Missing parameters')
  }

  if (!validateUUID(uuid)) {
    throw new Error('UUID provided is not valid')
  }

  try {
    const result = await model.create({ identifier: uuid, workspacename })
    return result
  } catch (err) {
    console.error(err)
    return false
  }
}
