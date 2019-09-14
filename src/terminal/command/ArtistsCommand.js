const Command = require('./Command')

module.exports =
class ArtistsCommand extends Command { // TODO: testear

    get name() {
        return 'artists'
    }

    get _argsDescription() {
        return []
    }

}
