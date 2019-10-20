const { OK, BAD_REQUEST } = require('../../status-codes')

const makeResponseData = artist => ({
    id: parseInt(artist.id),
    name: artist.name,
    country: artist.country,
    albums: artist.albums
})

module.exports = unqfy => (req, res, next) => {
    const artistId = parseInt(req.params.id)
    const artist   = unqfy.getArtistById(artistId)
    
    res.status(OK).json(makeResponseData(artist))
}