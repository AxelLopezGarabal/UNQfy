const TerminalCommandHandler = require('./TerminalCommandHandler')

module.exports =
class GetArtistByIdCommandHandler extends TerminalCommandHandler {

  static canHandle(aCommand) {
    return aCommand.name === 'getArtistById'
  }

  _validate(aCommand) {
    if (aCommand.numberOfArgsIsNot(1))
      throw 'ERROR: should pass one args as follow => Artist_id'
  }

  _excecute(unqfy, [id]) {
    return unqfy.getArtistById(id)
  }

}