const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { UNQfy } = require('./model/unqfy')
const albumsDataProvider = require('./apis_helpers/SpotifyAlbumsDataProvider')

const unqfy = new UNQfy(albumsDataProvider)

unqfy.addArtist({name: 'pepe', country: 'argentina'})
unqfy.addArtist({name: 'juan', country: 'argentina'})
unqfy.addArtist({name: 'the beatles', country: 'argentina'})

unqfy.populateAlbumsForArtist('the beatles')

const router = express.Router()

const { getArtistsHandler, postArtistsHandler, getOneArtistHandler } = require('./routes/handlers/artistsHandlers')

router
	.get('/', getArtistsHandler(unqfy))
	.post('/', postArtistsHandler(unqfy))
	.get('/:id', getOneArtistHandler(unqfy))


app
	.use(morgan('dev'))
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())

	.use('/api/artists', router)

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
