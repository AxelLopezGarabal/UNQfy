const ArgParser = require('./ArgParser')

const nameRegex          = /^[a-z]+$/i
const countryNameRegex   = /^[a-z\s]+$/i
const naturalNumberRegex = /^\d+$/

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
	})

}