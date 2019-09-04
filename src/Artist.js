class Artist {

  constructor({id, name, country}) {
    this._id      = id
    this._name    = name
    this._country = country
    this._albums  = []
  }

  // Queries
  get id()      { return this._id }
  get name()    { return this._name }
  get country() { return this._country }
  get albums()  { return this._albums }

  set name(newName) { this._name = newName }
  
  get allTracks() {
    return this.albums.reduce((tracks, anAlbum) => [...tracks, ...anAlbum.tracks], [])
  }

  // Commands
  addAlbum(anAlbum) {
    this._validateIsNewAlbum(anAlbum)
    this.albums.push(anAlbum)
  }

  // private
  // Command
  _validateIsNewAlbum(anAlbum) {
    if (this._hasAlbum(anAlbum))
      throw 'No se puede registrar un mismo album mas de una vez'
  }

  // Testing
  _hasAlbum(anAlbum) {
    return this.albums.includes(anAlbum)
  }

}

module.exports = Artist