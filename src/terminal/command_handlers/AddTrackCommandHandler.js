const TerminalCommandHandler = require('./TerminalCommandHandler')

module.exports =
class AddTrackCommandHandler extends TerminalCommandHandler {

  static canHandle(aCommand) {
    return aCommand.name === 'addTrack'
  }

  _validate(aCommand) {
    if (aCommand.numberOfArgsIsNot(4))
      throw ''
  }

  _excecute(unqfy, [albumId, trackName, duration, genres]) {
		unqfy.addTrack(albumId, {name: trackName, duration: parseInt(duration), genres})
	}

}
