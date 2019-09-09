const { AddArtistCommandHandler, AddAlbumCommandHandler } = require('./terminal/terminalCommands')

class Controller{

	constructor(unqfy) {
		this._unqfy = unqfy
	}

	addArtist(args) { new AddArtistCommandHandler().handle(this._unqfy, args)	}
	addAlbum(args)  { new AddAlbumCommandHandler().handle(this._unqfy, args)	}

	addTrack(args) {
		if (args.length != 4) {
			throw "ERROR : should pass four args as follow => Album_name, Track_name, Track_duration, Track_genres"
		}
		else {
			let album_id = this._unqfy.searchByName(args[0]).albums[0].id
			this._unqfy.addTrack(
				album_id, 
				{'name':args[1], 'duration':args[2], 'genres': this._processArray(args[3]) }
			)
		}
	}

	removeArtist(args) {
		if (args.length != 1) {
			throw "ERROR : should pass one args as follow => Artist_name"
		}
		else {
			let artistName = args[0]
			let tracks = this._unqfy.getTracksMatchingArtist(this._unqfy.getArtistByName(artistName))
			this._unqfy.removeTracksFromAllPlaylist(tracks)
			this._unqfy.removeArtist(artistName)
		}
	}

	createPlaylist(args) {
		if (args.length != 3) {
			throw "ERROR : should pass three args as follow => Playlist_name, Playlist_genres, Playlist_duration"
		}
		else{
			let ls = this._processArray(args[1])
			this._unqfy.createPlaylist(args[0], ls, args[2])
		}
	}
	removeAlbum(args) {
		if (args.length != 2) {
			throw "ERROR : should pass two args as follow => Artist_name, Album_name"
		}
		else{
			let album = this._unqfy.searchByName(args[1]).albums[0]
			let artist = this._unqfy.searchByName(args[0]).artists[0]
			this._unqfy.removeTracksFromAllPlaylist(album.tracks)
			this._unqfy.removeAlbumFromArtist(album, artist)
		}	
	}
	removeTrack(args) {}
	removePlaylist(args) {
		if (args.length != 1) {
			throw "ERROR : should pass one args as follow => Playlist_name"
		}
		else{
			this._unqfy.removePlaylist(args[0])
		}
	}

//		< < PRIVATE	> >

	_processArray(string) {
		let ls = string.replace('[', '').replace(']', '')
		ls = this._filter(ls, ',').split(' ')
		return ls
	}

	_filter(ls, string) {
		let temp = ls
		if (!temp.includes(',')) {
			return temp
		}
		else{
			return this._filter(temp.replace(',', ''), ',')
		}
	}
}

module.exports = Controller