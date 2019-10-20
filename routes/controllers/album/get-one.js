const RequestController = require('../RequestController')
const makeAlbumFullRepresentation = require('./make-album-full-representation')

class GetOneController extends RequestController {

    _validateRequest(req, res) {
        
    }

    _doTask(req, res) {
        const albumId      = parseInt(req.params.id)
        const album        = this._unqfy.getAlbumById(albumId)
        const responseBody = makeAlbumFullRepresentation(album)
        this.respondOk(res, responseBody)
    }

    _errorHandlers() {
        return {
            EntityNotFound: (error, req, res) => this.resourceNotFound(res)
        }
    }
}

module.exports = unqfy => (req, res) =>
    new GetOneController(unqfy).handle(req, res)