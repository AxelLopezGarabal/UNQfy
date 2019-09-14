const Command = require('./Command')

module.exports =
class AlbumsCommand extends Command { // TODO: testear

    get name() {
        return 'albums'
    }

    get _argsDescription() {
        return []
    }

}
