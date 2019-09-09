class AddAlbumCommand {

  static canHandle(args) {
    
  }

  handle(unqfy, [artistId, albumName, year]) {
		unqfy.addAlbum(artistId, {name: albumName, year})
	}

}

module.exports = AddAlbumCommand