const Playlist = require('./Playlist.js')

class PlaylistGenerator {

  generate(id, playlistName, genresToInclude, maxDuration, tracksToChooseFrom) {
    return tracksToChooseFrom.reduce((newPlaylist, aTrack) =>
      aTrack.matchSomeGenreFrom(genresToInclude) && this._doesNotExcedeMaxDurationAfterAdding(aTrack, newPlaylist, maxDuration)
        ? newPlaylist.addTrack(aTrack)
        : newPlaylist,
      this._createEmptyPlaylist(id, playlistName)
    )
  }

  _createEmptyPlaylist(id, name) {
    return new Playlist({ id, name })
  }

  _doesNotExcedeMaxDurationAfterAdding(aTrack, aPlaylist, aDuration) {
    return aTrack.duration + aPlaylist.duration() <= aDuration
  }

}

module.exports = PlaylistGenerator