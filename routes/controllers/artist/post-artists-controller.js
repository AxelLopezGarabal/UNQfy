const postArtistSchema             = require('./post-artist-schema')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

const { respondCreated, respondResourceAlreadyExist, respondBadRequest } = require('../responses')

// TODO: esta mierda esta quedando muy imperativa
module.exports = unqfy => (req, res, next) => {
  const validationResult = postArtistSchema.validate(req.body)

  if (validationResult.error)
    respondBadRequest(res, validationResult.error)

  let artist
  
  try {
    artist = unqfy.addArtist(req.body)
  }
  catch(error) {
    respondResourceAlreadyExist(res)
  }

  const responseBody = makeArtistFullRepresentation(artist)
   
  respondCreated(res, responseBody)
}