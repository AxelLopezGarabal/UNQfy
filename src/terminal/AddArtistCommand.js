class AddArtistCommand {

  static canHandle(args) {
    
  }

  handle(unqfy, [name, country]) {
		unqfy.addArtist({name, country})
	}

}

module.exports = AddArtistCommand