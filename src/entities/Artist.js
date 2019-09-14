require('../auxi/extenciones').extendArray()
const { RepeatedAlbumInArtist, ArtistaNoTieneRegistradoUnAlbum } = require('../exceptions/all')

class Artist {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const {id, name, country} = dataObject
    this._id      = id
    this._name    = name
    this._country = country
    this._albums  = []
  }

  // Testing
  isTheAuthorOfAlbum(anAlbum) {
    return this.albums.includes(anAlbum)
  }

  isTheAuthorOfTrack(aTrack) {
    return this.allTracks.includes(aTrack)
  }

  // Queries
  get id()      { return this._id }
  get name()    { return this._name }
  get country() { return this._country }
  get albums()  { return this._albums }

  set name(newName)     { this._name   = newName }
  set albums(newalbums) { this._albums = newalbums }
  
  get allTracks() {
    return this.albums.flatMap(album => album.tracks)
  }

  findAlbumById(albumId) {
    return this.albums.find(album => album.id === albumId)
  }

  // Commands
  addAlbum(anAlbum) {
    this._validateIsNewAlbum(anAlbum)
    this.albums.push(anAlbum)
  }

  removeAlbum(anAlbum) {
    this._validateisTheAuthorOfAlbum(anAlbum)
    this._albums.remove(anAlbum)
  }

  addTrack(albumId, aTrack) { // TODO: test
    this.findAlbumById(albumId).addTrack(aTrack)
  }

  /* PRIVATE */
  _validateIsNewAlbum(anAlbum) {
    if (this.isTheAuthorOfAlbum(anAlbum))
      throw new RepeatedAlbumInArtist(this, anAlbum)
  }

  _validateisTheAuthorOfAlbum(anAlbum) {
    if (!this.isTheAuthorOfAlbum(anAlbum))
      throw new ArtistaNoTieneRegistradoUnAlbum(this, anAlbum)
  }

}

module.exports = Artist