//const postScheme        = require('./post-artist-schema')
const RequestController = require('../RequestController')

class PostController extends RequestController {

    _validate(req) {
        return postScheme.validate(req.body)
    }

    _doTask(req, res) {
        const playlistData = req.body
        console.log("")
        console.log(req.body)
        console.log("")
        if (playlistData.name != undefined && playlistData.maxDuration != undefined && playlistData.genres != undefined){
            const playlist = this._unqfy.createPlaylist(playlistData.name, playlistData.genres, playlistData.maxDuration)
            this.respondCreated(res, playlist.toJSON())
        }
    }

    _errorHandlers() {
        return {
          SomeoneAlreadyRegisterUnderName: (error, req, res) => {this.respondResourceAlreadyExist(res);
            console.log(error);}
        }
    }

}

module.exports = unqfy => (req, res) =>
    new PostController(unqfy).handle(req, res)

