module.exports =
class InvalidArgument extends Error {

	constructor(argName, expectedTypeName, actualString) {
		super(`Argumento invalido para "${argName}" (${expectedTypeName}). Valor provisto: "${actualString}"`)
	}

}