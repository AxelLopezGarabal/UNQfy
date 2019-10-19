const postArtistSchema = require('./post-artist-schema')
const { OK, CREATED, BAD_REQUEST } = require('../../status-codes')


const getArtistsHandler = unqfy => (req, res, next) => {
	res.status(OK).json(unqfy.artists)
}

const postArtistsHandler = unqfy => (req, res, next) => {
  const validationResult = postArtistSchema.validate(req.body)

  if (validationResult.error)
    return res.status(BAD_REQUEST).json(validationResult.error)

  const artist = unqfy.addArtist(req.body)
  
  const artistData = {
    id: parseInt(artist.id),
    name: artist.name,
    country: artist.country,
    albums: artist.albums
  }

  console.log(artist)

	res.status(CREATED).json(artistData)
}

const getOneArtistHandler = unqfy => (req, res, next) => {
  const artistId = parseInt(req.params.id)
  const artist = unqfy.getArtistById(artistId)
  
  const artistData = {
    id: artist.id,
    name: artist.name,
    country: artist.country,
    albums: artist.albums
  }
	res.status(OK).json(artistData)
}

module.exports = {
  getArtistsHandler,
  postArtistsHandler,
  getOneArtistHandler
}