const { validate } = require('uuid')
module.exports = (model) => async (uuid, workspacename) => {
  if (!uuid) {
    throw new Error('Missing parameters')
  }

  console.log(validate)

  try {
    const result = await model.create({ identifier: uuid, workspacename })
    return result
  } catch (err) {
    console.error(err)
    return false
  }
}
