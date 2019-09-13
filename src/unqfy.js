const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy
require('./auxi/extenciones').extendArray()

const PlaylistGenerator = require('./PlaylistGenerator.js')
const { Artist, Album, Track, Playlist } = require('./entities/all')
const { ArtistAlreadyRegisterUnderName } = require('./exceptions/all')

const ArtistCreation = require('./entities-creation/ArtistCreation')
const AlbumCreation = require('./entities-creation/AlbumCreation')
const TrackCreation = require('./entities-creation/TrackCreation')

class UNQfy {

  constructor() {
    this._playlists = []
    this._artists   = []
    this._nextId    = 0
  }
  
  _generateUniqueId() { return this._nextId++ }

  get playlists() { return this._playlists }
  get artists()   { return this._artists }
  get albums()    { return this.artists.flatMap(artist => artist.albums) }
  get tracks()    { return this.albums.flatMap(album => album.tracks) }

  /** CREACION DE CONTENIDO **/
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new ArtistCreation(this, artistData).handle()
    this.artists.push(newArtist)
    return newArtist
  }

  
  _hasArtistCalled(aName) {
    return this.artists.some(artist => artist.name === aName)
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */

    const newAlbum = new AlbumCreation(this, albumData).handle()
    
    this
      .getArtistById(artistId)
      .addAlbum(newAlbum)
    
    return newAlbum
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const newTrack = new TrackCreation(this, trackData).handle()

    this
      .getAlbumById(albumId)
      .addTrack(newTrack)

    return newTrack
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    const newPlaylist = new PlaylistGenerator().generate(this._generateUniqueId(), name, genresToInclude, maxDuration, this.tracks)
    this.playlists.push(newPlaylist)
    return newPlaylist
  }

  /** BUSQUEDAS **/
  searchByNamePartial(aPartialName) {
    return {
      artists  : this._searchByNamePartialIn(this.artists  , aPartialName),
      albums   : this._searchByNamePartialIn(this.albums   , aPartialName),
      tracks   : this._searchByNamePartialIn(this.tracks   , aPartialName),
      playlists: this._searchByNamePartialIn(this.playlists, aPartialName)
    }
  }

  _searchByNamePartialIn(aCollection, aPartialName) {
    return aCollection.filter(anEntity => RegExp(aPartialName).test(anEntity.name))
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  searchByName(aName) {
    return {
      artists  : this._searchByNameIn(this.artists  , aName),
      albums   : this._searchByNameIn(this.albums   , aName),
      tracks   : this._searchByNameIn(this.tracks   , aName),
      playlists: this._searchByNameIn(this.playlists, aName),
    }
  }
  
  _searchByNameIn(aCollection, aName) {
    //return aCollection.filter(anElement => anElement.name === aName)
    return this._searchByNamePartialIn(aCollection, aName)
  }
  
  _getByIdIn(aCollectionName, id, errorMessage) {
    return this._getByPredicateIn(aCollectionName, obj => obj.id === id, `No se encontro entidad con id ${id} en ${aCollectionName}`)
  }

  _getByPredicateIn(aCollectionName, predicate, errorMessage='Elemento no encontrado') {
    const element = this[aCollectionName].find(predicate) 
    if (element == undefined)
      throw errorMessage
    return element
  }

  /********************/

  getArtistById(id)   { return this._getByIdIn('artists',   id) }
  getAlbumById(id)    { return this._getByIdIn('albums',    id) }
  getTrackById(id)    { return this._getByIdIn('tracks',    id) }
  getPlaylistById(id) { return this._getByIdIn('playlists', id) }

  getArtistByName(aName) {
    return this.artists.find(anArtist => anArtist.name === aName)
  }

  getTracksMatchingGenres(genres) {
    return this.tracks.filter(track => track.matchSomeGenreFrom(genres))
  }

  _searchAuthorOf(anAlbum) {
    return this._getByPredicateIn('artists', artist => artist.isTheAutorOf(anAlbum))
    //return this.artists.find(artist => artist.isTheAutorOf(anAlbum))
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    // TODO: en el test pasa "un artista" pero el parametro se llama "artistName"
    //return this.getArtistByName(artistName).allTracks
    return artistName.allTracks
  }

  /** ELIMINACIONES **/
  removeArtist(artistId) {
    const artist = this.getArtistById(artistId)
    this._removeTracksFromAllPlaylist(artist.allTracks)
    this._artists.remove(artist)
  }

  removeAlbum(albumId) {
    const album = this.getAlbumById(albumId)
    this._searchAuthorOf(album).removeAlbum(album)
    this._removeTracksFromAllPlaylist(album.tracks)
  }

  removeTrack(trackId) { // TODO: test
    const track = this.getTrackById(trackId)
    _searchAlbumOf(track).removeTrack(track)
    this._removeTracksFromAllPlaylist([track])
  }

  removePlaylist(playlistId){
    this._playlists.remove(this.getPlaylistById(playlistId))
  }

  _removeTracksFromAllPlaylist(tracks){
    this.playlists.forEach(playlist => playlist.removeAll(tracks))
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
    const classes = [UNQfy, Artist, Album, Track, Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes)
  }

}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}

