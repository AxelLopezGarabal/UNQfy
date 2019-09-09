class AddTrackCommand {

  static canHandle(args) {
    
  }

  handle(unqfy, [albumId, trackName, duration, genres]) {
		unqfy.addTrack(albumId, {name: trackName, duration: parseInt(duration), genres})
	}

}

module.exports = AddTrackCommand