const Listening = require('./Listening')

module.exports =
class User {

  constructor(id, name) {
    this._id         = id
    this._name       = name
    this._listenings = []
  }

  get id()                  { return this._id }
  get name()                { return this._name }
  get listenings()          { return this._listenings }
  get listenedTracks()      { return [...new Set(this._allListenedTracksInOrder)] }

  timesListened(aTrack) {
    return this._allListenedTracksInOrder.filter(each => each === aTrack).length
  }

  mostListenedTracks(amountResults) {
    return this.listenedTracks
      .sort((x,y) => this.timesListened(y) - (this.timesListened(x)))
      .slice(0, amountResults)
  }

  hasListened(aTrack) { return this.listenedTracks.includes(aTrack) }

  listen(aTrack) {
    const listening = new Listening(aTrack)
    this._listenings.push(listening)
    return listening
  }

  listenAll(tracks) {
    tracks.forEach(track => this.listen(track))
  }

  // private
  get _allListenedTracksInOrder() {
    return this.listenings.map(aListening => aListening.track)
  }
}