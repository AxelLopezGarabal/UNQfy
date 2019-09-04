class Playlist {

  constructor({id, name}) {
    this._id     = id
    this._name   = name
    this._tracks = []
  }

  get id()     { return this._id }
  get name()   { return this._name }
  get tracks() { return this._tracks }

  addTrack(aTrack) {
    this.tracks.push(aTrack)
  }

  hasTrack(aTrack) {
    return this.tracks.includes(aTrack)
  }
}

module.exports = Playlist