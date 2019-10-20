const postSchema                  = require('./post-schema')

const RequestController = require('../RequestController')
const makeAlbumFullRepresentation = require('./make-album-full-representation')

class PostController extends RequestController {

    _validateRequest(req, res) {
        const validationResult = postSchema.validate(req.body)

        if (validationResult.error)
            this.respondBadRequest(res, validationResult.error)
    }

    _doTask(req, res) {
        const { artistId, name, year } = req.body

        const album        = this._unqfy.addAlbum(artistId, { name, year })
        const responseBody = makeAlbumFullRepresentation(album)
    
        this.respondCreated(res, responseBody)
    }

    _errorHandlers() {
        return {
           RepeatedAlbumNameInArtist: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



