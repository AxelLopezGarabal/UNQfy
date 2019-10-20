const { OK, CREATED, BAD_REQUEST, CONFLICT, NO_CONTENT } = require('./status-codes')

const badRequestPromise = (res, responseBody) =>
  Promise.reject({statusCode: BAD_REQUEST, body: responseBody})

const respondOk = (res, responseBody) =>
  res.status(OK).json(responseBody)

const respondDeleted = res =>
  res.status(NO_CONTENT).json()

const respondCreated = (res, responseBody) =>
  res.status(CREATED).json(responseBody)

const respondBadRequest = (res, responseBody) =>
  res.status(BAD_REQUEST).json(responseBody)

const respondResourceAlreadyExist = res =>
  res.status(CONFLICT).json({ errorCode: 'RESOURCE_ALREADY_EXIST' })

module.exports = {
    badRequestPromise,

    respondOk,
    respondCreated,
    respondDeleted,
    respondBadRequest,
    respondResourceAlreadyExist
}