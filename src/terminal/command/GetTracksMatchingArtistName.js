const Command = require('./Command')
const { nameArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')


module.exports =
class GetTracksMatchingArtistName extends Command {

    get name() {
        return 'getTracksMatchingArtistName'
    }

    get _argsDescription() {
        return [nameArgumentDescription('artist name')]
    }

}
