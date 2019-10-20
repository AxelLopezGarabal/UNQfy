const RequestController = require('../RequestController')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

class GetAllController extends RequestController {

    _validateRequest(req, res) {
        
    }

    _doTask(req, res) {
        const artistPartialName = req.query.name

				const artists      = this._unqfy.searchByNamePartial(artistPartialName).artists
				const responseBody = artists.map(makeArtistFullRepresentation)
				
				this.respondOk(res, responseBody)
    }

    _handleError(error, req, res) {

    }
}

module.exports = unqfy => (req, res) => {
    new GetAllController(unqfy).handle(req, res)
}