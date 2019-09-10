const Command = require('./Command')

module.exports =
class RemoveAlbumCommand extends Command {
    
    _excecute(unqfy, [albumName]) {
    	let album = unqfy.searchByNamePartial(albumName).albums[0];
		unqfy.removeAlbum(album.id)
		return {artist_Removed: album};
    }
    
    get name() { return 'removeAlbum' }

    get _argsDescription() {
        return [{name: 'album name'}]
    }

}