const ApiError =require('./errors/APIError').ApiError

function errorHandler(err, req, res, next){
	if(err instanceof ApiError){
		res.status(err.status)
		.json({status: err.status, errorCode: err.errorCode});	
	}
	else{
		next(err)
	}
}

module.exports = errorHandler