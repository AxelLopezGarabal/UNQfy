const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class GetAlbumByIdCommand extends Command {

    get name() {
        return 'getAlbumById'
    }

    get _argsDescription() {
        return [naturalNumberArgumentDescription('id')]
    }

}
