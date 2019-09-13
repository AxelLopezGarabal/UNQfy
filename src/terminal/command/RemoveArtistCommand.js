const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class RemoveArtistCommand extends Command {
    
    get name() {
        return 'removeArtist'
    }

    get _argsDescription() {
        return [ naturalNumberArgumentDescription('artistId') ]
    }

}