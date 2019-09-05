require('./aux/extenciones').extendArray()

class Playlist {

  constructor({ id, name, tracks = [] }) {
    this._id     = id
    this._name   = name
    this._tracks = tracks
  }

  get id()       { return this._id }
  get name()     { return this._name }
  get tracks()   { return this._tracks }
  //get duration() { return this.tracks.reduce((total, aTrack) => total + aTrack.duration, 0) }
  duration() { return this.tracks.reduce((total, aTrack) => total + aTrack.duration, 0) }

  set name(newName) { this._name = newName }

  addTrack(aTrack) {
    this.tracks.push(aTrack)
    return this
  }

  addAllTracks(tracks) { // TODO: test
    this.tracks.push(...tracks)
    return this
  }

  hasTrack(aTrack) {
    return this.tracks.includes(aTrack)
  }
}

module.exports = Playlist