const postScheme = require('./post-artist-schema')

const RequestController = require('../RequestController')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

class PostController extends RequestController {

    _validate(req) {
        return postScheme.validate(req.body)
    }

    _validateRequest(req, res) {
        const validationResult = postArtistSchema.validate(req.body)

        if (validationResult.error)
          this.respondBadRequest(res, validationResult.error)
    }

    _doTask(req, res) {
        const artistData   = { name: req.body.name, country: req.body.country }
        console.log('post artsits', artistData)
        const artist       = this._unqfy.addArtist(artistData)
        const responseBody = makeArtistFullRepresentation(artist)
        this.respondCreated(res, responseBody)
    }

    _errorHandlers() {
        return {
          SomeoneAlreadyRegisterUnderName: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



