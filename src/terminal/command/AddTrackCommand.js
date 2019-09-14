const Command = require('./Command')
const {
  naturalNumberArgumentDescription,
  alphanumericArgumentDescription,
  arrayArgumentDescription
} = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class AddTrackCommand extends Command {
    
    _excecute(unqfy, [albumId, trackName, duration, genres]) {
      genres = genres.split(',').map(string => string.trim())
      unqfy.addTrack(albumId, {name: trackName, duration: duration, genres})
    }
    
    get name() {
      return 'addTrack'
    }

    get _argsDescription() {
      return [
        naturalNumberArgumentDescription('album id'),
        alphanumericArgumentDescription('track name'),
        naturalNumberArgumentDescription('duration'),
        arrayArgumentDescription('genres'),
      ]
    }

}