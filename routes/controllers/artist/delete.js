const RequestController = require('../RequestController')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

class DeleteController extends RequestController {

    _validateRequest(req, res) {
        
    }

    _doTask(req, res) {
        const artistId = parseInt(req.params.id)
        this._unqfy.removeArtist(artistId)
        this.respondDeleted(res)
    }

    _handleError(error, req, res) {
        res.status(666).send(error)
    }
}

module.exports = unqfy => (req, res) => {
    new DeleteController(unqfy).handle(req, res)
}