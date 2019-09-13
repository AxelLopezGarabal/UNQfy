const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class RemoveAlbumCommand extends Command {
    
    get name() {
        return 'removeAlbum'
    }

    get _argsDescription() {
        return [{name: 'albumId', parser: naturalNumberArgumentDescription}]
    }

}