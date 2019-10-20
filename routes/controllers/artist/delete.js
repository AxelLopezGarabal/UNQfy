const RequestController = require('../RequestController')

class DeleteController extends RequestController {

    _doTask(req, res) {
        const artistId = parseInt(req.params.id)
        this._unqfy.removeArtist(artistId)
        this.respondDeleted(res)
    }

    _errorHandlers() {
        return {
            EntityNotFound: (error, req, res) => this.resourceNotFound(res)
        }
    }

}

module.exports = unqfy => (req, res) => {
    new DeleteController(unqfy).handle(req, res)
}