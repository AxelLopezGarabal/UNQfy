const Playlist = require('./entities/Playlist')

class PlaylistGenerator {

  generate(id, playlistName, genresToInclude, maxDuration, tracksToChooseFrom) {
    return tracksToChooseFrom
      .filter(track => track.matchSomeGenreFrom(genresToInclude))
      .reduce((newPlaylist, aTrack) =>
          this._doesNotExcedeMaxDurationAfterAddingTo(newPlaylist, aTrack, maxDuration)
          ? newPlaylist.addTrack(aTrack)
          : newPlaylist,
        this._createEmptyPlaylist(id, playlistName)
      )
  }

  _createEmptyPlaylist(id, name) {
    return new Playlist({ id, name })
  }

  _doesNotExcedeMaxDurationAfterAddingTo(aPlaylist, aTrack, aDuration) {
    return aTrack.duration + aPlaylist.duration() <= aDuration
  }

}

module.exports = PlaylistGenerator