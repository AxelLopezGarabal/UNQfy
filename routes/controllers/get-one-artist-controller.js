const makeArtistFullRepresentation = require('./make-artist-full-representation')

const { respondOk } = require('./responses')

module.exports = unqfy => (req, res, next) => {
    const artistId     = parseInt(req.params.id)
    const artist       = unqfy.getArtistById(artistId)
    const responseBody = makeArtistFullRepresentation(artist)
    respondOk(res, responseBody)
}