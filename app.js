const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const artistsControllers = require('./routes/controllers/artist/artistsControllers')
const albumController    = require('./routes/controllers/album/AlbumController')

const { UNQfy } = require('./model/unqfy')
const albumsDataProvider = require('./apis_helpers/SpotifyAlbumsDataProvider')

// const unqfy = new UNQfy(albumsDataProvider)
const unqfy = new UNQfy()

// unqfy.addArtist({name: 'pepe', country: 'argentina'})
// unqfy.addArtist({name: 'juan', country: 'argentina'})
// const theBeatles = unqfy.addArtist({name: 'the beatles', country: 'argentina'})
// const album = unqfy.addAlbum(theBeatles.id, {name: 'album beatles', year: 1970})

// unqfy.populateAlbumsForArtist('the beatles')

const artistsRout = express.Router()

artistsRout
	.get('/'      , artistsControllers.getAll(unqfy))
	.get('/:id'   , artistsControllers.getOne(unqfy))
	.post('/'     , artistsControllers.post(unqfy))
	.delete('/:id', artistsControllers.delete(unqfy))

const albumsRout = express.Router()

albumsRout
	.get('/'      , albumController.getAll(unqfy))
	.get('/:id'   , albumController.getOne(unqfy))
	.post('/'     , albumController.post(unqfy))
	.delete('/:id', albumController.delete(unqfy))

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
		res.status(error.status || 500);
		res.json({
			error:{
				message: error.message
			}
		})
})

module.exports = app; 
