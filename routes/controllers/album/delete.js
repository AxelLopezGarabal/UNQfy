const RequestController = require('../RequestController')

class DeleteController extends RequestController {

    _validateRequest(req, res) {
        
    }

    _doTask(req, res) {
      const albumId = parseInt(req.params.id)
      this._unqfy.removeAlbum(albumId)  
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