const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class RemovePlaylistCommand extends Command {
    
    get name() {
        return 'removePlaylist'
    }

    get _argsDescription() {
        return [ naturalNumberArgumentDescription('playlist id') ]
    }

}