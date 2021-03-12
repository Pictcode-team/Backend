const { validate } = require('uuid')
module.exports = (model) => async (uuid, workspacename) => {
  if (!uuid) {
    throw new Error('Missing parameters')
  }
  if (!validate(uuid)) {
    throw new Error('UUID is not valid')
  }

  try {
    const repeated = await model.findAll({ where: { identifier: uuid } })
    console.log(repeated)
    if (repeated.length < 0) {
      const result = await model.create({ identifier: uuid, workspacename })
      return result
    }
    throw new Error('Workspace already exists')
  } catch (err) {
    console.error(err)
    return err
  }
}
