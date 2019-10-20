const postArtistSchema             = require('./post-artist-schema')
const makeArtistFullRepresentation = require('./make-artist-full-representation')
const { CREATED, BAD_REQUEST }     = require('../../status-codes')

module.exports = unqfy => (req, res, next) => {
    const validationResult = postArtistSchema.validate(req.body)
  
    if (validationResult.error)
      return res.status(BAD_REQUEST).json(validationResult.error)
  
    const artist       = unqfy.addArtist(req.body)
    const responseBody = makeArtistFullRepresentation(artist)
     
    res.status(CREATED).json(responseBody)
}