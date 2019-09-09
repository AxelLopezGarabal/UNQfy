module.exports =
class TerminalCommandHandler {

  static canHandle(aCommand) {
    throw "Subclass responsability"
  }

  handle(unqfy, aCommand) {
    this._validate(aCommand)
		this._excecute(unqfy, aCommand.args)
	}

  _validate(aCommand) {
    throw "Subclass responsability"
  }

  _excecute(unqfy, args) {
    throw "Subclass responsability"
  }

}
