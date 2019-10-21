const postSchema                  = require('./post-schema')
const RequestController = require('../RequestController')

class PostController extends RequestController {

    _validate(req) {
        return postSchema.validate(req.body)
    }

    _doTask(req, res) {
        const { artistId, name, year } = req.body
        const album = this._unqfy.addAlbum(artistId, { name, year })
        this.respondCreated(res, album.toJSON())
    }

    _errorHandlers() {
        return {
           RepeatedAlbumNameInArtist: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



