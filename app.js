const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ticketRoutes = require('./routes/default');

app
	.use(morgan('dev'))
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())

	.use('/', ticketRoutes)


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
