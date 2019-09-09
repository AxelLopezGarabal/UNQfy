const TerminalCommand = require('./TerminalCommand')

class AddArtistCommand extends TerminalCommand {

  _validateArgs(args) {
    if (args.length != 2)
      throw 'ERROR: should pass two args as follow => Artist_name, country'
  }

  _excecute(unqfy, [name, country]) {
    unqfy.addArtist({name, country})
  }

}

module.exports = AddArtistCommand