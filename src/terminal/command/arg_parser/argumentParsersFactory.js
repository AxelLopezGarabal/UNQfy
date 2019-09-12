const ArgParser = require('./ArgParser')

const nameRegex          = /^[a-z]+$/i
const countryNameRegex   = /^[a-z\s]+$/i
const naturalNumberRegex = /^\d+$/
const alphanumericRegex  = /.+/

module.exports = {

	nameArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'un nombre',
		validationRegex: nameRegex
	}),

	countryNameArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'un nombre de pais',
		validationRegex: countryNameRegex
	}),

	naturalNumberArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'un numero natural',
		validationRegex: naturalNumberRegex,
		parseFunction: parseInt
	}),

	alphanumericArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'alphanumerico',
		validationRegex: alphanumericRegex
	})


}