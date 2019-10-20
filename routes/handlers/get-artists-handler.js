const { respondOk } = require('./responses')

module.exports = unqfy => (req, res, next) => {
	respondOk(res, unqfy.artists)
}