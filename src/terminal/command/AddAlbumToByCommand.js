const Command = require('./Command')

module.exports =
class AddAlbumToByCommand extends Command {
    
    get name()             { return 'addAlbumTo' }
    get _argsDescription() { return [{ name: 'artist name'}, { name: 'name' }, { name: 'year' }] }

    _excecute(unqfy, [artistName, albumName, albumYear]) {
    	let id = unqfy.getArtistByName(artistName).id;
		unqfy.addAlbum(id, {name: albumName, year: albumYear});
		return {name: albumName, year: albumYear};
    }
}