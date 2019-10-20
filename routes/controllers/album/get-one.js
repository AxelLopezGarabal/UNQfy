const makeAlbumFullRepresentation = require('./make-album-full-representation')

const { respondOk } = require('../responses')

module.exports = unqfy => (req, res, next) => {
    const albumId      = parseInt(req.params.id)
    const album        = unqfy.getAlbumById(albumId)
    const responseBody = makeAlbumFullRepresentation(album)
    respondOk(res, responseBody)
}