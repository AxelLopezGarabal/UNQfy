require('../auxi/extenciones').extendArray()
const { RepeatedTrackInAlbum, RepeatedTrackNameInAlbum } = require('../exceptions/all')

class Album {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const {id, name, year, tracks=[]} = dataObject
    this._id     = id
    this._name   = name
    this._year   = year
    this._tracks = tracks
  }

  get id()     { return this._id }
  get name()   { return this._name }
  get year()   { return this._year }
  get tracks() { return this._tracks }

  set name(newName) { this._name = newName }

  hasTrack(aTrack) {
    return this.tracks.includes(aTrack)
  }

  hasTrackNamed(aName) {
    return this.tracks.some(track => track.name === aName)
  }

  addTrack(aTrack) {
    this._validateIsNewTrack(aTrack)
    this.tracks.push(aTrack)
  }

  removeTrack(aTrack) {
    this.tracks.remove(aTrack)
  }

  // private
  _validateIsNewTrack(aTrack) {
    if (this.hasTrack(aTrack))
      throw new RepeatedTrackInAlbum(aTrack, this)
    if (this.hasTrackNamed(aTrack.name))
      throw new RepeatedTrackNameInAlbum(aTrack, this)
  }

}

module.exports = Album