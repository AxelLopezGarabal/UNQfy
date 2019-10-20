const { respondOk } = require('../responses')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

module.exports = unqfy => (req, res, next) => {
	const artistPartialName = req.query.name

	const artists      = unqfy.searchByNamePartial(artistPartialName).artists
	const responseBody = artists.map(makeArtistFullRepresentation)
	
	respondOk(res, responseBody)
}