const RequestController = require('../RequestController')

class PutController extends RequestController {

    // _validate(req) {
    //     return patchSchema.validate(req.body)
    // }

    _doTask(req, res) {
      const artistId      = parseInt(req.params.id)
      const artistData    = req.body
      const updatedArtist = this._unqfy.updateArtist(artistId, artistData)
    
      this.respondOk(res, updatedArtist.toJSON())
    }

    _errorHandlers() {
        return {
          SomeoneAlreadyRegisterUnderName: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PutController(unqfy).handle(req, res)



