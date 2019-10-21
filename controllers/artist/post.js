const postScheme        = require('./post-artist-schema')
const RequestController = require('../RequestController')

class PostController extends RequestController {

    _validate(req) {
        return postScheme.validate(req.body)
    }

    _doTask(req, res) {
        const artistData = req.body
        const artist     = this._unqfy.addArtist(artistData)
        this.respondCreated(res, artist.toJSON())
    }

    _errorHandlers() {
        return {
          SomeoneAlreadyRegisterUnderName: (error, req, res) => this.respondResourceAlreadyExist(res)
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)



