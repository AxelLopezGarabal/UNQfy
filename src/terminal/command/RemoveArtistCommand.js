const Command = require('./Command')
const { naturalNumberArgumentParser } = require('./arg_parser/argumentParsersFactory')

module.exports =
class RemoveArtistCommand extends Command {
    
    get name() {
        return 'removeArtist'
    }

    get _argsDescription() {
        return [{name: 'artistId', parser: naturalNumberArgumentParser}]
    }

}