const Command = require('./Command')
const { naturalNumberArgumentParser } = require('./arg_parser/argumentParsersFactory')


module.exports =
class GetArtistByIdCommand extends Command {

    get name() {
        return 'getArtistById'
    }

    get _argsDescription() {
        return [{ name: 'id', parser: naturalNumberArgumentParser}]
    }

}
