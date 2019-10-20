const postArtistSchema             = require('./post-artist-schema')

const RequestController = require('../RequestController')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

class PostController extends RequestController {

    _validateRequest(req, res) {
        const validationResult = postArtistSchema.validate(req.body)

        if (validationResult.error)
          this.respondBadRequest(res, validationResult.error)
    }

    _doTask(req, res) {
        const artist       = this._unqfy.addArtist(artistData)
        const responseBody = makeArtistFullRepresentation(artist)
        this.respondCreated(res, responseBody)
    }

    _handleError(error, req, res) {
      res.send(error)
      //this.respondResourceAlreadyExist(res)
    }
}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



