const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT
} = require('./status-codes')

module.exports =
class RequestController {

  constructor(unqfy) {
      this._unqfy = unqfy
  }

  handle(req, res) {
      this._validateRequest(req, res)
      
      try {
          this._doTask(req, res)
      }
      catch (error) {
          this._handleError(error, req, res)
      }
  }

  _validateRequest(req, res) { throw "Subclass responsibility" }
  _doTask(req, res)          { throw "Subclass responsibility" }
  _errorHandlers()           { return {} }

  _handleError(error, req, res) {
    const missingErrorHandler = (error, req, res) => { throw error }
    const currentErrorHandler = this._errorHandlers()[error.name] || missingErrorHandler
    currentErrorHandler(error, req, res)
  }

  respondOk(res, responseBody) {
    res.status(OK).json(responseBody)
  }
  
  respondDeleted(res) {
    res.status(NO_CONTENT).json()
  }
  
  respondCreated(res, responseBody) {
    res.status(CREATED).json(responseBody)
  }

  respondBadRequest(res, responseBody) {
    res.status(BAD_REQUEST).json(responseBody)
  }

  resourceNotFound(res) {
    res.status(NOT_FOUND).json({ errorCode: "RESOURCE_NOT_FOUND" })
  }
  
  respondResourceAlreadyExist(res) {
    res.status(CONFLICT).json({ errorCode: 'RESOURCE_ALREADY_EXIST' })
  }

}