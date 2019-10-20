const RequestController = require('../RequestController')
const makeAlbumFullRepresentation = require('./make-album-full-representation')

class GetAllController extends RequestController {
    
    _doTask(req, res) {
        const albumPartialName = req.query.name
        
        const albums       = this._unqfy.searchByNamePartial(albumPartialName).albums
        const responseBody = albums.map(makeAlbumFullRepresentation)
        
        this.respondOk(res, responseBody)
    }

}

module.exports = unqfy => (req, res) => {
    new GetAllController(unqfy).handle(req, res)
}