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

  addTrack(aTrack) {
    this._validateIsNewTrack(aTrack)
    this.tracks.push(aTrack)
  }

  // private
  _validateIsNewTrack(aTrack) {
    if (this.tracks.includes(aTrack))
      throw `El track ${aTrack.name} ya forma parte del album`
  }

}

module.exports = Album