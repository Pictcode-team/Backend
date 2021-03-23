const { v4 } = require('uuid')
module.exports = (model) => async (workspacename) => {
  const uuid = v4()
  const repeated = await model.findAll({ where: { identifier: uuid } })
  if (repeated.length === 0) {
    const expirationDate = new Date(Date.now() + (60 * 60 * 1000))
    console.log(new Date())
    console.log(expirationDate)
    const result = await model.create({ identifier: uuid, workspacename, expirationDate })
    return { uuid: uuid, workspaceId: result.workspaceId }
  }
  throw new Error('Workspace already exists')
}
