const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class GetArtistByIdCommand extends Command {

    get name() {
        return 'getArtistById'
    }

    get _argsDescription() {
        return [naturalNumberArgumentDescription('id')]
    }

}
