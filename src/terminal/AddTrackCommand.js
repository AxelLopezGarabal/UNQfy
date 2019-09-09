const TerminalCommand = require('./TerminalCommand')

class AddTrackCommand extends TerminalCommand {

  _validateArgs(args) {
    if (args.length != 4)
      throw ''
  }

  _excecute(unqfy, [albumId, trackName, duration, genres]) {
		unqfy.addTrack(albumId, {name: trackName, duration: parseInt(duration), genres})
	}

}

module.exports = AddTrackCommand