const { respondDeleted } = require('../responses')

module.exports = unqfy => (req, res, next) => {
  const albumId = parseInt(req.params.id)
  
  unqfy.removeAlbum(albumId)

	respondDeleted(res)
}