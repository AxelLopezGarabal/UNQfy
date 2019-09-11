const Command = require('./Command')

module.exports =
class AddTrackCommand extends Command {
    
    _excecute(unqfy, [albumId, trackName, duration, genres]) {
		  unqfy.addTrack(albumId, {name: trackName, duration: parseInt(duration), genres})
    }
    
    get name() {
      return 'addTrack'
    }

    get _argsDescription() {
      return [{ name: 'album id'}, { name: 'name' }, { name: 'duration' }, { name: 'genres'}]
    }

}