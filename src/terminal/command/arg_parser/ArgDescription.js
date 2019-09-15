const InvalidArgument = require('./InvalidArgument.js')

module.exports =
class ArgDescription {

  constructor({
    name,
    typeDescription,
    validationRegex,
    parseFunction = (x => x)
  })
  {
    this._name            = name
    this._typeDescription = typeDescription
    this._validationRegex = validationRegex
    this._parseFunction   = parseFunction
  }

  get name() { return this._name }

  parse(stringToParse) {
    this._validate(stringToParse)
    return this._parseFunction(stringToParse)
  }

  _validate(stringToParse) {
    if (!this._validationRegex.test(stringToParse))
      throw new InvalidArgument(
        this._name,
        this._typeDescription,
        stringToParse
      )
  }

}