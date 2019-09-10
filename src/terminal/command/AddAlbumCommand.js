const Command = require('./Command')

module.exports =
class AddAlbumCommand extends Command {
    
    _excecute(unqfy, [artistId, albumName, year]) {
		  unqfy.addAlbum(parseInt(artistId), {name: albumName, year})
    }
    
    get name() { return 'addAlbum' }

    get _argsDescription() {
        return [{ name: 'artist id'}, { name: 'name' }, { name: 'year' }]
    }

}