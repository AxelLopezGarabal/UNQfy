const { OK, BAD_REQUEST }          = require('../../status-codes')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

module.exports = unqfy => (req, res, next) => {
    const artistId     = parseInt(req.params.id)
    const artist       = unqfy.getArtistById(artistId)
    const responseBody = makeArtistFullRepresentation(artist)
    res.status(OK).json(responseBody)
}