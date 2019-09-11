const ArgParser = require('./ArgParser')

const nameRegex          = /^[a-z]+$/i
const naturalNumberRegex = /^\d+$/

module.exports = {

	nameArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'un nombre',
		validationRegex: nameRegex
	}),

	naturalNumberArgumentParser: argName => new ArgParser({
		argName: argName,
		typeDescription: 'un numero entero',
		validationRegex: naturalNumberRegex,
		parseFunction: parseInt
	})

}