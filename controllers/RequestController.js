const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  RELATED_RESOURCE_NOT_FOUND,
  CONFLICT
} = require('./status-codes')

module.exports =
class RequestController {

  constructor(unqfy) {
      this._unqfy = unqfy
  }

  handle(req, res) {
      console.log('handle')
      this._validateRequest(req, res)
      
      try {
          this._doTask(req, res)
      }
      catch (error) {
          this._handleError(error, req, res)
      }
  }

  // _validateRequest(req, res) {
  //   const validationResult = this._validate(req)

  //   if (validationResult.error)
  //     this.respondBadRequest(res, validationResult.error)
  // }

  _validateRequest(req, res) {
    const validationResult = this._validate(req)

    if (validationResult.error)
      this.respondBadRequest(res)
  }

  _validate(req)             { return {} }
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


  respondBadRequest(res) {
    res.status(BAD_REQUEST).json({ status: BAD_REQUEST, errorCode: "BAD_REQUEST" })
  }

  resourceNotFound(res) {
    res.status(NOT_FOUND).json({ status: NOT_FOUND, errorCode: "RESOURCE_NOT_FOUND" })
  }

  respondeRelatedResourceNotFound(res) {
    res.status(RELATED_RESOURCE_NOT_FOUND).json({ status: RELATED_RESOURCE_NOT_FOUND, errorCode: "RELATED_RESOURCE_NOT_FOUND" })
  }
  
  respondResourceAlreadyExist(res) {
    res.status(CONFLICT).json({ status: CONFLICT, errorCode: 'RESOURCE_ALREADY_EXISTS' })
  }

}