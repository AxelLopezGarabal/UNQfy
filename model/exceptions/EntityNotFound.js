module.exports =
class EntityNotFound extends Error {

  constructor(errorExtraInformation='entity not found') {
    super(`Error: ${errorExtraInformation}`)
  }

}