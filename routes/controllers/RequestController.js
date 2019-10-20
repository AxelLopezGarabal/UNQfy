const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
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

  _validateRequest(req, res)   { throw "Subclass responsibility" }
  _doTask(req, res)            { throw "Subclass responsibility" }
  _handleError(error,req, res) { throw "Subclass responsibility" }

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
  
  respondResourceAlreadyExist(res) {
    res.status(CONFLICT).json({ errorCode: 'RESOURCE_ALREADY_EXIST' })
  }

}