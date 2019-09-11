const Command = require('./Command')

module.exports =
class RemoveArtistCommand extends Command {
    
    _excecute(unqfy, [artistName]) {
    	let artist = unqfy.getArtistByName(artistName);
		unqfy.removeArtist(artist.id)
		return {artist_Removed: artist};
    }
    
    get name() {
        return 'removeArtist'
    }

    get _argsDescription() {
        return [{ name: 'aritst name'}]
    }

}