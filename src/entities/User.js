const Listening = require('./Listening')

module.exports =
class User {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    this._id         = dataObject.id
    this._name       = dataObject.name
    this._listenings = []
    this._playlists  = []
  }

  get id()             { return this._id }
  get name()           { return this._name }
  get listenings()     { return this._listenings }
  get listenedTracks() { return [...new Set(this._allListenedTracksInOrder)] }
  get playlists()      { return this._playlists }

  hasListened(aTrack) {
    return this.listenedTracks.includes(aTrack)
  }

  timesListened(aTrack) {
    return this._allListeneningsOf(aTrack).length
  }

  mostListenedTracks(amountResults) {
    return this.listenedTracks
      .sort((x,y) => this.timesListened(y) - (this.timesListened(x)))
      .slice(0, amountResults)
  }

  listen(aTrack) {
    const listening = new Listening(aTrack)
    this._listenings.push(listening)
    return listening
  }

  listenAll(tracks) {
    tracks.forEach(track => this.listen(track))
  }

  registerPlaylist(aPlaylist) {
    this.playlists.push(aPlaylist)
  }

  removePlaylist(aPlaylist) {
    this.playlists.remove(aPlaylist)
  }

  /* PRIVATE */
  get _allListenedTracksInOrder() {
    return this.listenings.map(aListening => aListening.track)
  }

  _allListeneningsOf(aTrack) {
    return this.listenings.filter(aListening => aListening.track === aTrack)
  }
}