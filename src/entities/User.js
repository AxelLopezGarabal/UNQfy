const Listening = require('./Listening')

module.exports =
class User {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    this._id            = dataObject.id
    this._name          = dataObject.name
    this._notifications = []
    this._followings    = []
    this._listenings    = []
    this._playlists     = []
  }

  get id()             { return this._id }
  get name()           { return this._name }
  get notifications()  { return this._notifications }
  get listenings()     { return this._listenings }
  get listenedTracks() { return [...new Set(this._allListenedTracksInOrder)] }
  get playlists()      { return this._playlists }
  get followings()     { return this._followings }

  /** TESTING **/
  hasListened(aTrack) {
    return this.listenedTracks.includes(aTrack)
  }

  isFollowing(anArtist) {
    return this.followings.includes(anArtist)
  }

  /** QUERIES **/
  timesListened(aTrack) {
    return this._allListeneningsOf(aTrack).length
  }

  mostListenedTracks(amountResults) {
    return this.listenedTracks
      .sort((x,y) => this.timesListened(y) - (this.timesListened(x)))
      .slice(0, amountResults)
  }

  /** COMMANDS **/

  // listen(aTrack) {
  //   const listening = new Listening(aTrack)
  //   this._listenings.push(listening)
  //   return listening
  // }

  addToHistory(aListening) {
    this.listenings.push(aListening)
  }

  registerPlaylist(aPlaylist) {
    this.playlists.push(aPlaylist)
  }

  removePlaylist(aPlaylist) {
    this.playlists.remove(aPlaylist)
  }

  follow(anArtist) {
    this._validateCanFollow(anArtist)
    this.followings.push(anArtist)
    anArtist.addFollower(this)
  }

  addNotification(aNotification) {
    this.notifications.push(aNotification)
  }

  /** PRIVATE **/
  get _allListenedTracksInOrder() {
    return this.listenings.map(aListening => aListening.track)
  }

  _allListeneningsOf(aTrack) {
    return this.listenings.filter(aListening => aListening.track === aTrack)
  }

  _validateCanFollow(anArtist) {
    if (this.isFollowing(anArtist))
      throw `${user.name} ya esta siguiendo a ${anArtist.name}`
  }
}