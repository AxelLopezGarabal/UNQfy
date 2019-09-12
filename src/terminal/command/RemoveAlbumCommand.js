const Command = require('./Command')
const { naturalNumberArgumentParser } = require('./arg_parser/argumentParsersFactory')

module.exports =
class RemoveAlbumCommand extends Command {
    
    get name() {
        return 'removeAlbum'
    }

    get _argsDescription() {
        return [{name: 'albumId', parser: naturalNumberArgumentParser}]
    }

}