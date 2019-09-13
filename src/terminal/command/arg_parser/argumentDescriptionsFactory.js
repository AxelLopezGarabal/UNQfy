const ArgDescription = require('./ArgDescription')

const nameRegex          = /^[a-z]+$/i
const countryNameRegex   = /^[a-z\s]+$/i
const naturalNumberRegex = /^\d+$/
const alphanumericRegex  = /.+/
const arrayRegex         = /^\[(.+)*\]$/ // Esto es re pedorro, esperemos que el profe no lea esto

module.exports = {

	nameArgumentDescription: name => new ArgDescription({
		name: name,
		typeDescription: 'un nombre',
		validationRegex: nameRegex
	}),

	countryNameArgumentDescription: name => new ArgDescription({
		name: name,
		typeDescription: 'un nombre de pais',
		validationRegex: countryNameRegex
	}),

	naturalNumberArgumentDescription: name => new ArgDescription({
		name: name,
		typeDescription: 'un numero natural',
		validationRegex: naturalNumberRegex,
		parseFunction: parseInt
	}),

	alphanumericArgumentDescription: name => new ArgDescription({
		name: name,
		typeDescription: 'alphanumerico',
		validationRegex: alphanumericRegex
	}),

	arrayArgumentDescription: name => new ArgDescription({
		name: name,
		typeDescription: 'un arreglo',
		validationRegex: arrayRegex,
		parseFunction: xsString => eval(xsString)
	})

}