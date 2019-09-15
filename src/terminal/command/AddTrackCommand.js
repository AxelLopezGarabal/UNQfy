const Command = require('./Command')
const {
  naturalNumberArgumentDescription,
  alphanumericArgumentDescription,
  arrayArgumentDescription
} = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class AddTrackCommand extends Command {
  
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

  _arrange([albumId, trackName, duration, genres]) {
    return [albumId, {name: trackName, duration, genres}]
  }

}