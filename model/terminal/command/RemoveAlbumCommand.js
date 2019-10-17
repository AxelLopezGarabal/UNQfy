const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class RemoveAlbumCommand extends Command { // TODO: testear
    
    get name() {
        return 'removeAlbum'
    }

    get _argsDescription() {
        return [naturalNumberArgumentDescription('album id')]
    }

}