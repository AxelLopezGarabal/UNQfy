const Command = require('./Command')
const { arrayArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class GetTracksMatchingGenres extends Command {

    get name() {
        return 'getTracksMatchingGenres'
    }

    get _argsDescription() {
        return [arrayArgumentDescription('genres names')]
    }

}
