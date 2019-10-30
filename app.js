const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const errorHandler = require('./errorhandler')

const artistRoutes = require('./routes/artist');
const albumRoutes  = require('./routes/album');
const trackRoutes  = require('./routes/tracks');
const playlistRoutes  = require('./routes/playlist');

app
	.use(morgan('dev'))
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())

	.use('/api/artists', artistRoutes)
	.use('/api/albums', albumRoutes)
	.use('/api/tracks', trackRoutes)
	.use('/api/playlist', playlistRoutes)

	.use(errorHandler)

    .use((req, res, next) => {
		const error = new Error('Not found')
		error.status = 404
		next(error)
	})

	.use((error, req, res, next) => {
		if (/Unexpected token/.test(error.message)){
			res
				.status(400)
				.json({
					status: 400,
					errorCode: 'BAD_REQUEST'
				})
		}
		else{
			res
				.status(error.status)
				.json({
					status: 404,
					errorCode: 'RESOURCE_NOT_FOUND'
				})
		}
	})

module.exports = app; 
