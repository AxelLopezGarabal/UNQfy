const ApiError =require('./APIError').ApiError
class ResourceAlreadyExistError extends ApiError{
	constructor(){
		super('ResourceAlreadyExistError', 409, 'RESOURCE_ALREADY_EXISTS')
	}
}

module.exports = {
	ResourceAlreadyExistError	
}