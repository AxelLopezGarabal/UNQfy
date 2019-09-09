class TerminalCommand {

  handle(unqfy, args) {
    this._validateArgs(args)
		this._excecute(unqfy, args)
	}

  _validateArgs(args) {
    throw "Should be implemented"
  }

  _excecute(unqfy, args) {
    throw "Should be implemented"
  }

}

module.exports = TerminalCommand