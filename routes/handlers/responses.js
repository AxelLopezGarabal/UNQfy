const { OK, CREATED, BAD_REQUEST, CONFLICT } = require('../../status-codes')

const respondOk = (res, responseBody) =>
  res.status(OK).json(responseBody)

const respondCreated = (res, responseBody) =>
  res.status(CREATED).json(responseBody)

const respondBadRequest = (res, responseBody) =>
  res.status(BAD_REQUEST).json(responseBody)

const respondResourceAlreadyExist = res =>
  res.status(CONFLICT).json({ errorCode: 'RESOURCE_ALREADY_EXIST' })

module.exports = {
    respondOk,
    respondCreated,
    respondBadRequest,
    respondResourceAlreadyExist
}