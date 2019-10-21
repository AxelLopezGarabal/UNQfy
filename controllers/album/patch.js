const RequestController = require('../RequestController')

class PatchController extends RequestController {

    _doTask(req, res) {
      const albumId      = parseInt(req.params.id)
      const albumData    = req.body
      const updatedAlbum = this._unqfy.updateAlbum(albumId, albumData)
    
      this.respondOk(res, updatedAlbum.toJSON())
    }

    _errorHandlers() {
        return {
          // TODO: completar
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PatchController(unqfy).handle(req, res)



