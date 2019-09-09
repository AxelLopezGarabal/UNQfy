const TerminalCommandHandler = require('./TerminalCommandHandler')

module.exports =
class AddArtistCommandHandler extends TerminalCommandHandler {

  static canHandle(aCommand) {
    return aCommand.name === 'addArtist'
  }

  _validate(aCommand) {
    if (aCommand.numberOfArgsIsNot(2))
      throw 'ERROR: should pass two args as follow => Artist_name, country'
  }

  _excecute(unqfy, [name, country]) {
    unqfy.addArtist({name, country})
  }

}