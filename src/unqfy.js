const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy

const { Artist, Album, Track, User, Playlist } = require('./entities/all') // esto hace falta para el framework de persistencia
const {ArtistCreation, AlbumCreation, TrackCreation, UserCreation} = require('./entities-creation/all') // Method objects

const PlaylistGenerator = require('./PlaylistGenerator.js')

const EntitiesRepository = require('./entities-repositories/EntitiesRepository')


class UNQfy {

  constructor(entitiesRepository = new EntitiesRepository()) {
    this._entitiesRepository = entitiesRepository
    this._nextId             = 0
  }

  _generateUniqueId() { return this._nextId++ }

  get playlists() { return this._entitiesRepository.playlists }
  get artists()   { return this._entitiesRepository.artists }
  get albums()    { return this._entitiesRepository.albums }
  get tracks()    { return this._entitiesRepository.tracks }

  /////////////////////
  addUser(userData) {
    const newUser = new UserCreation(this, userData).handle()
    this._entitiesRepository.addUser(newUser)
    return newUser
  }

  registerListening(userId, trackId) {
    const user  = this.getUserById(userId)
    const track = this.getTrackById(trackId)
    user.listen(track)
  }

  createPlaylistFor(userId, playlistName, genresToInclude, maxDuration) {
    const newPlaylist = this.createPlaylist(playlistName, genresToInclude, maxDuration)
    this.getUserById(userId).registerPlaylist(newPlaylist)
    return newPlaylist
  }

  /** CREACION DE CONTENIDO **/

  // artistData -> {name, country}
  addArtist(artistData) {
    const newArtist = new ArtistCreation(this, artistData).handle()
    this._entitiesRepository.addArtist(newArtist)
    return newArtist
  }

  existsArtistWithId(id) {
    return this._entitiesRepository.someHas('artist', {prop: 'id', value: id})
  }

  existSomeoneCalled(aName) {
    return this._entitiesRepository.someHas('artist', {prop: 'name', value: aName}) ||
           this._entitiesRepository.someHas('user'  , {prop: 'name', value: aName})

  }
  // albumData {name, year}
  addAlbum(artistId, albumData) {
    const newAlbum = new AlbumCreation(this, albumData).handle()
    const artist   = this.getArtistById(artistId)
    artist.addAlbum(newAlbum)
    return newAlbum
  }

  // trackData -> {name, duration, genres}
  addTrack(albumId, trackData) {
    const newTrack = new TrackCreation(this, trackData).handle()
    const album    = this.getAlbumById(albumId)
    album.addTrack(newTrack)
    return newTrack
  }

  createPlaylist(name, genresToInclude, maxDuration) {
    const newPlaylist = new PlaylistGenerator().generate(this._generateUniqueId(), name, genresToInclude, maxDuration, this.tracks)
    this._entitiesRepository.addPlaylist(newPlaylist)
    return newPlaylist
  }

  /** BUSQUEDAS **/
  //searchByName(aName)               { return this._entitiesRepository.filterAll(entity => entity.name === aName) }
  searchByName(aName)               { return this._entitiesRepository.filterAll(entity => new RegExp(aName).test(entity.name)) }
  searchByNamePartial(aPartialName) { return this._entitiesRepository.filterAll(entity => new RegExp(aPartialName).test(entity.name)) }

  getArtistById(id)      { return this._entitiesRepository.findBy('artist'  , {prop: 'id', value: id}) }
  getAlbumById(id)       { return this._entitiesRepository.findBy('album'   , {prop: 'id', value: id}) }
  getTrackById(id)       { return this._entitiesRepository.findBy('track'   , {prop: 'id', value: id}) }
  getPlaylistById(id)    { return this._entitiesRepository.findBy('playlist', {prop: 'id', value: id}) }
  getUserById(id)        { return this._entitiesRepository.findBy('user'    , {prop: 'id', value: id}) }

  getArtistByName(aName) { return this._entitiesRepository.findBy('artist', { prop: 'name', value: aName }) }

  getTracksMatchingGenres(genres) {
    return this._entitiesRepository.filterBy('track', track => track.matchSomeGenreFrom(genres))
  }

  getTracksMatchingArtist(artistName) {
    // TODO: en el test pasa "un artista" pero el parametro se llama "artistName"
    //return this.getArtistByName(artistName).allTracks
    return artistName.allTracks
  }

  getAuthorOfAlbum(anAlbum) {
    return this._entitiesRepository.find('artist', artist => artist.isTheAuthorOfAlbum(anAlbum))
  }

  /** ELIMINACIONES **/
  removeArtist(artistId) {
    this._entitiesRepository.removeArtist(artistId)
  }
  
  removeAlbum(albumId) {
    const album = this.getAlbumById(albumId)
    this._removeFromAllPlaylists(album.tracks)
    this.getAuthorOfAlbum(album).removeAlbum(album)
  }
  
  removeTrack(trackId) {
    const track = this.getTrackById(trackId)
    this._removeFromAllPlaylists([track])
    this.getAuthorOfTrack(track).removeTrack(track)
  }

  removePlaylist(playlistId) {
    this._entitiesRepository.removePlaylist(playlistId)
  }

  _removeFromAllPlaylists(tracks) {
    this._entitiesRepository.forEach('playlist', playlist => playlist.removeAll(tracks))
  }

  /** PERSISTENCIA **/
  save(filename) {
    const listenersBkp = this.listeners
    this.listeners = []

    const serializedData = picklify.picklify(this)

    this.listeners = listenersBkp
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2))
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'})
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, Playlist, EntitiesRepository];
    return picklify.unpicklify(JSON.parse(serializedData), classes)
  }

}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}