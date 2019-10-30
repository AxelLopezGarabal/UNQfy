const ApiError =require('./APIError').ApiError
class RelatedResourceNotFoundError extends ApiError{
	constructor(){
		super('RelatedResourceNotFound', 404, 'RELATED_RESOURCE_NOT_FOUND')
	}
}

module.exports = {
	RelatedResourceNotFoundError	
}