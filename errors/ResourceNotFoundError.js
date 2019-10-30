const ApiError =require('./APIError').ApiError
class ResourceNotFoundError extends ApiError{
	constructor(){
		super('ResourceNotFound', 404, 'RESOURCE_NOT_FOUND')
	}
}

module.exports = {
	ResourceNotFoundError	
}