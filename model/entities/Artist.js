require('../auxi/extenciones').extendArray()
const { RepeatedAlbumInArtist, ArtistaNoTieneRegistradoUnAlbum, RepeatedAlbumNameInArtist } = require('../exceptions/all')
const AlreadyFollowedBySomeone = require('../exceptions/AlreadyFollowedBySomeone')

class Artist {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const {id, name, country} = dataObject
    this._id        = id
    this._name      = name
    this._country   = country
    this._albums    = []
    this._followers = []
    this._othersListeningsOfHisArt = []
  }

  toJSON() { // TODO: no tiene test
    return {
      id: this.id,
      name: this.name,
      country: this.country,
      albums: this.albums.map(album => album.toJSON())
    }
  }

  isTheAuthorOfAlbum(anAlbum) {
    return this.albums.includes(anAlbum)
  }

  isTheAuthorOfTrack(aTrack) {
    return this.allTracks.includes(aTrack)
  }

  isFollowedBy(aUser) {
    return this.followers.includes(aUser)
  }

  // Queries
  get id()        { return this._id }
  get name()      { return this._name }
  get country()   { return this._country }
  get albums()    { return this._albums }
  get followers() { return this._followers }
  get allTracks() { return this.albums.flatMap(album => album.tracks) }
  get othersListeningsOfHisArt() { return this._othersListeningsOfHisArt }

  set name(newName)     { this._name   = newName }
  set albums(newalbums) { this._albums = newalbums }

  /*  */
  update({name, country = this._country}) {
    this._name    = name
    this._country = country
  }

  /* ALBUMS */
  addAlbum(anAlbum) {
    this._validateNewAlbum(anAlbum)
    this.albums.push(anAlbum)
    this._notifyAll({artist: this, album: anAlbum})
  }

  removeAlbum(anAlbum) {
    this._validateisTheAuthorOfAlbum(anAlbum)
    this._albums.remove(anAlbum)
  }

  findAlbum(aPredicate) {
    const album = this.albums.find(aPredicate)
    if (album == undefined) throw 'album not found'
    return album
  }

  findAlbumById(albumId) {
    return this.findAlbum(album => album.id === albumId)
  }

  findAlbumByName(albumName) {
    return this.findAlbum(album => album.name === albumName)
  }

  /* TRACKS */
  addTrackTo(anAlbum, aTrack) { // TODO: test
    this._validateisTheAuthorOfAlbum(anAlbum)
    anAlbum.addTrack(aTrack)
    this._notifyAll({artist: this, album: anAlbum, track: aTrack})
  }

  removeTrack(aTrack) {
    this.albums.find(album => album.hasTrack(aTrack)).removeTrack(aTrack)
  }

  /* FOLLOWERS */
  addFollower(aUser) {
    this._validateNewFollower(aUser)
    this.followers.push(aUser)
  }

  registerOthersListeningsOfHisArt(aListening) {
    this._othersListeningsOfHisArt.push(aListening)
  }

  /* PRIVATE */
  /* ALBUM */
  _validateisTheAuthorOfAlbum(anAlbum) {
    if (!this.isTheAuthorOfAlbum(anAlbum))
      throw new ArtistaNoTieneRegistradoUnAlbum(this, anAlbum)
  }

  _validateNewAlbum(anAlbum) {
    if (this.isTheAuthorOfAlbum(anAlbum))
      throw new RepeatedAlbumInArtist(this, anAlbum)
    if (this._hasAlbumCalled(anAlbum.name))
      throw new RepeatedAlbumNameInArtist(this, anAlbum)
  }

  _hasAlbumCalled(aName) {
    return this.albums.some(album => album.name === aName)
  }

  /* FOLLOWERS */
  _notifyAll(aNotification) {
    this.followers.forEach(follower => follower.addNotification(aNotification))
  }

  _validateNewFollower(aUser) {
    if (this.isFollowedBy(aUser)) 
      throw new AlreadyFollowedBySomeone(this, aUser)
  }

}

module.exports = Artist