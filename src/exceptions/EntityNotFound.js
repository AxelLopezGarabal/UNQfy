module.exports =
class EntityNotFound extends Error {

  constructor(entityName) {
    super(`${entityName} not found`)
  }

}