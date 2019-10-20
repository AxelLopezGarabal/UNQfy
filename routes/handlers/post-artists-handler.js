const postArtistSchema         = require('./post-artist-schema')
const { CREATED, BAD_REQUEST } = require('../../status-codes')

const makeResponseData = artist => ({
    id: parseInt(artist.id),
    name: artist.name,
    country: artist.country,
    albums: artist.albums
})

module.exports = unqfy => (req, res, next) => {
    const validationResult = postArtistSchema.validate(req.body)
  
    if (validationResult.error)
      return res.status(BAD_REQUEST).json(validationResult.error)
  
    const artist = unqfy.addArtist(req.body)
     
    res.status(CREATED).json(makeResponseData(artist))
}