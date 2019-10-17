const Command = require('./Command')
const {
  naturalNumberArgumentDescription,
} = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class RemoveTrack extends Command {
    
    get name() {
      return 'removeTrack'
    }

    get _argsDescription() {
      return [
        naturalNumberArgumentDescription('track id')
      ]
    }

}