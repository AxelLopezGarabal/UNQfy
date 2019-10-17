const Command = require('./Command')

module.exports =
class RemovePlaylist extends Command { // TODO: testear

    get name() {
        return 'removePlaylist'
    }

}
