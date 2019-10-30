const ApiError =require('./APIError').ApiError

class BadRequestError extends ApiError{
	constructor(){
		super('BadRequestError', 400, 'BAD_REQUEST')
	}
}

module.exports = {
	BadRequestError	
}