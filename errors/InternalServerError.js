const ApiError =require('./APIError').ApiError
class InternalServerError extends ApiError{
	constructor(){
		super('InternalServerError', 404, 'Internal_Server_Error')
	}
}

module.exports = {
	InternalServerError	
}