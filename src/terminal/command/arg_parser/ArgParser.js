const InvalidArgument = require('./InvalidArgument.js')

module.exports =
class ArgParser {

  constructor({
    argName,
    typeDescription,
    validationRegex,
    parseFunction = (x => x)
  })
  {

    this._argName             = argName
    this._validationRegex     = validationRegex
    this._typeDescription     = typeDescription
    this._parseFunction       = parseFunction
  }

  parse(stringToParse) {
    this._validate(stringToParse)
    return this._parseFunction(stringToParse)
  }

  _validate(stringToParse) {
    if (!this._validationRegex.test(stringToParse))
      throw new InvalidArgument(
        this._argName,
        this._typeDescription,
        stringToParse
      )
  }

}