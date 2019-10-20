const { respondDeleted } = require('../responses')

module.exports = unqfy => (req, res, next) => {
  const artistId = parseInt(req.params.id)
  
  unqfy.removeArtist(artistId)

	respondDeleted(res)
}