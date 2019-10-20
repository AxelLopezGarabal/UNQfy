const { OK, BAD_REQUEST } = require('../../status-codes')

module.exports = unqfy => (req, res, next) => {
	res.status(OK).json(unqfy.artists)
}