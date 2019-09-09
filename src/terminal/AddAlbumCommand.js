const TerminalCommand = require('./TerminalCommand')

class AddAlbumCommand extends TerminalCommand {

  _validateArgs(args) {
    if (args.length != 3)
      throw ''
  }

  _excecute(unqfy, [artistId, albumName, year]) {
		unqfy.addAlbum(artistId, {name: albumName, year})
	}

}

module.exports = AddAlbumCommand