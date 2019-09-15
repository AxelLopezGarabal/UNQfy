const Command = require('./Command')

module.exports =
class PlaylistsCommand extends Command { // TODO: testear

    get name() {
        return 'playlists'
    }

}
