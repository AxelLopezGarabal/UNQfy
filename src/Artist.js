require('./aux/extenciones').extendArray()

class Artist {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const {id, name, country} = dataObject
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
  set albums(newalbums) { this._albums = newalbums }
  
  get allTracks() {
    return this.albums.flatMap(album => album.tracks)
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