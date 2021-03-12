const { validate } = require('uuid')
const getInformation = (model) => async (uuid) => {
  if (!uuid) {
    throw new Error('Missing parameters')
  }
  if (!validate(uuid)) {
    throw new Error('UUID is not valid')
  }
  try {
    const workspace = await model.findOne({ attributes: ['identifier', 'workspacename'], where: { identifier: uuid }, include: 'images' })
    return workspace
  } catch (err) {
    console.log(err)
  }
}

module.exports = getInformation
