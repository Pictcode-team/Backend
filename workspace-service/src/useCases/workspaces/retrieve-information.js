const { validate } = require('uuid')
const getInformation = (model) => async (uuid) => {
  if (!model.Image || !model.Workspace) {
    throw new Error('Models missing')
  }

  if (!uuid) {
    throw new Error('Missing parameters')
  }
  if (!validate(uuid)) {
    throw new Error('UUID is not valid')
  }

  const query = {
    attributes: ['identifier', 'workspacename', 'expirationDate'],
    where: {
      identifier: uuid
    },
    include: {
      model: model.Image,
      required: true,
      attributes: ['url']
    }
  }
  const workspace = await model.Workspace.findOne(query)
  if (workspace) {
    const expired = Date.now() > Date.parse(workspace.dataValues.expirationDate)
    if (expired) {
      return { uuid, expired: true }
    }
  }
  return { expired: false, ...workspace.dataValues }
}

module.exports = getInformation
