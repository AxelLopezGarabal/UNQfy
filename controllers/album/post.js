const postSchema        = require('./post-schema')
const RequestController = require('../RequestController')

class PostController extends RequestController {

    _validate(req) {
        return postSchema.validate(req.body)
    }

    _doTask(req, res) {
        const albumData = req.body
        const name = albumData.name;
        const year = albumData.year;
        if(albumData.artistId != undefined && name != undefined && year != undefined){
            const album = this._unqfy.addAlbum(albumData.artistId, { name, year })
            this.respondCreated(res, album.toJSON())
        }
    }

    _errorHandlers() {
        return {
            EntityNotFound: (error, req, res) => this.respondeRelatedResourceNotFound(res),
            RepeatedAlbumNameInArtist: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



