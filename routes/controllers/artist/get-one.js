const RequestController = require('../RequestController')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

class GetOneController extends RequestController {

    _validateRequest(req, res) {
        
    }

    _doTask(req, res) {
        const artistId     = parseInt(req.params.id)
        const artist       = this._unqfy.getArtistById(artistId)
        const responseBody = makeArtistFullRepresentation(artist)
        this.respondOk(res, responseBody)
    }

    _handleError(error, req, res) {

    }
}

module.exports = unqfy => (req, res) =>
    new GetOneController(unqfy).handle(req, res)