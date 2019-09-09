const TerminalCommandHandler = require('./TerminalCommandHandler')

module.exports =
class AddAlbumCommandHandler extends TerminalCommandHandler {

  static canHandle(aCommand) {
    return aCommand.name === 'addAlbum'
  }

  _validate(aCommand) {
    if (aCommand.numberOfArgsIsNot(3))
      throw ''
  }

  _excecute(unqfy, [artistId, albumName, year]) {
		unqfy.addAlbum(artistId, {name: albumName, year})
	}

}