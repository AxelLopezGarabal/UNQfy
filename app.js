const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { UNQfy } = require('./model/unqfy')
const albumsDataProvider = require('./apis_helpers/SpotifyAlbumsDataProvider')
const lyricsProvider     = require('./apis_helpers/MusicMatchLyricsProvider')

// const unqfy = new UNQfy(albumsDataProvider, lyricsProvider)
const unqfy = new UNQfy()

// unqfy.addArtist({name: 'pepe', country: 'argentina'})
// unqfy.addArtist({name: 'juan', country: 'argentina'})
// const theBeatles = unqfy.addArtist({name: 'the beatles', country: 'argentina'})
// const album = unqfy.addAlbum(theBeatles.id, {name: 'album beatles', year: 1970})

// unqfy.populateAlbumsForArtist('the beatles')

const makeCrudRoute      = require('./routes/make-crud-route')
const artistsControllers = require('./controllers/artist/artistsControllers')
const albumController    = require('./controllers/album/AlbumController')

const artistsRout = makeCrudRoute(artistsControllers, unqfy)
const albumsRout  = makeCrudRoute(albumController   , unqfy)

artistsRout.put('/:id', require('./controllers/artist/put')(unqfy))
albumsRout.patch('/:id', require('./controllers/album/patch')(unqfy))

app
	.use(morgan('dev'))
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())

	.use('/api/artists', artistsRout)
	.use('/api/albums', albumsRout)

	.use((req, res, next) => {
		const error = new Error('Not found')
		error.status = 404
		next(error)
	})

	.use((error, req, res, next) => {
		if (/Unexpected token/.test(error.message))
			res
				.status(400)
				.json({
					status: 400,
					errorCode: 'BAD_REQUEST'
				})
		else
			res
				.status(error.status)
				.json({
					status: 404,
					errorCode: 'RESOURCE_NOT_FOUND'
				})
	})

module.exports = app; 
