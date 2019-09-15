const Command = require('./Command')
const {
  naturalNumberArgumentDescription,
  alphanumericArgumentDescription,
  arrayArgumentDescription
} = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class CreatePlaylistCommand extends Command {
  
  get name() {
    return 'createPlaylist'
  }

  get _argsDescription() {
    return [
      alphanumericArgumentDescription('playlist name'),
      arrayArgumentDescription('genres to include'),
      naturalNumberArgumentDescription('max duration')
    ]
  }

}