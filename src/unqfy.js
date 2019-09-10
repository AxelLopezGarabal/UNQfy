const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy
//require('./aux/extenciones').extendArray()
const { List } = require('immutable')

const { Artist, Album, Track, Playlist } = require('./entities/all_entities')
const PlaylistGenerator = require('./PlaylistGenerator.js')

class UNQfy {

  constructor() {
    this._playlists = []
    this._artists   = []
    this._nextId    = 0
  }

  get playlists() { return this._playlists }
  get artists()   { return this._artists }
  get albums()    { return this.artists.flatMap(artist => artist.albums) }
  get tracks()    { return this.albums.flatMap(album => album.tracks) }
  
  get _allEntities() { return [...this.artists, ...this.albums, ...this.tracks, ...this.playlists] }

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
    const newArtist = this._createContent(Artist, artistData)
    this.artists.push(newArtist)
    return newArtist
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
    const newAlbum = this._createContent(Album, albumData)
    
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
    const newTrack = this._createContent(Track, trackData)

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

  _generateUniqueId() { return this._nextId++ }

  _createContent(aClass,  dataObject) {
    return new aClass({ id: this._generateUniqueId(), ...dataObject })
  }

  /** BUSQUEDAS **/
  searchByNamePartial(aPartialName) {
    return {
      artists  : this._searchByNamePartialIn(this.artists  , aName),
      albums   : this._searchByNamePartialIn(this.albums   , aName),
      tracks   : this._searchByNamePartialIn(this.tracks   , aName),
      playlists: this._searchByNamePartialIn(this.playlists, aName),
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
    return aCollection.filter(anElement => anElement.name = aName)
  }

  getArtistById(id)   { return this._getEntityById(id) }
  getAlbumById(id)    { return this._getEntityById(id) }
  getTrackById(id)    { return this._getEntityById(id) }
  getPlaylistById(id) { return this._getEntityById(id) } // TODO: falta test
  
  _getEntityById(id) { return this._allEntities.find(anEntity => anEntity.id === id) }

  getArtistByName(aName) {
    return this.artists.find(anArtist => anArtist.name === aName)
  }

  getTracksMatchingGenres(genres) {
    return this.tracks.filter(track => track.matchSomeGenreFrom(genres))
  }

  _searchAuthorOf(anAlbum) {
    return this.artists.find(anArtist => anArtist.isTheAutorOf(anAlbum))
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

