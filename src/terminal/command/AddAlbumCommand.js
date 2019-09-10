const Command = require('./Command')

module.exports =
class AddAlbumCommand extends Command {
    
    get name()             { return 'addAlbum' }
    get _argsDescription() { return [{ name: 'artist id'}, { name: 'name' }, { name: 'year' }] }

    _parse([artistId, albumName, year]) {
        return [parseInt(artistId), {name: albumName, year}]
    }

}