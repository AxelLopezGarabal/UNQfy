const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy

const { Artist, Album, Track, Playlist } = require('./entities/all')
const ArtistRepository = require('./entities-repositories/ArtistRepository')

const EntitiesRepository = require('./entities-repositories/EntitiesRepository')

const PlaylistGenerator = require('./PlaylistGenerator.js')

const ArtistCreation = require('./entities-creation/ArtistCreation')
const AlbumCreation = require('./entities-creation/AlbumCreation')
const TrackCreation = require('./entities-creation/TrackCreation')

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
    this._entitiesRepository.addArtist(newArtist)
    return newArtist
  }

  _hasArtistCalled(aName) {
    return this._entitiesRepository.someArtist(artist => artist.name === aName)
    // return this.artists.some(artist => artist.name === aName)
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
    this._entitiesRepository.addAlbum(artistId, newAlbum)
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
    this._entitiesRepository.addTrack(albumId, newTrack)
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
    this._entitiesRepository.addPlaylist(newPlaylist)
    return newPlaylist
  }

  /** BUSQUEDAS **/
  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  //searchByName(aName)               { return this._entitiesRepository.filterAll(entity => entity.name === aName) }
  searchByName(aName)               { return this._entitiesRepository.filterAll(entity => new RegExp(aName).test(entity.name)) }
  searchByNamePartial(aPartialName) { return this._entitiesRepository.filterAll(entity => new RegExp(aPartialName).test(entity.name)) }

  /********************/
  
  getArtistById(id)      { return this._entitiesRepository.findArtistById(id) }
  getAlbumById(id)       { return this._entitiesRepository.findAlbumById(id) }
  getTrackById(id)       { return this._entitiesRepository.findTrackById(id) }
  getPlaylistById(id)    { return this._entitiesRepository.findPlaylistById(id) }

  getArtistByName(aName) { return this._entitiesRepository.findArtistBy(artist => artist.name === aName) }

  getTracksMatchingGenres(genres) {
    const tracks = this._entitiesRepository.filterTracks(track => track.matchSomeGenreFrom(genres))
    return tracks
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    // TODO: en el test pasa "un artista" pero el parametro se llama "artistName"
    //return this.getArtistByName(artistName).allTracks
    return artistName.allTracks
  }

  /** ELIMINACIONES **/
  removeArtist(artistId)     { this._entitiesRepository.removeArtist(artistId)}
  removeAlbum(albumId)       { this._entitiesRepository.removeAlbum(albumId) }
  removeTrack(trackId)       { this._entitiesRepository.removeTrack(trackId) }
  removePlaylist(playlistId) { this._entitiesRepository.removePlaylist(playlistId) }

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
    const classes = [UNQfy, Artist, Album, Track, Playlist, EntitiesRepository, ArtistRepository];
    return picklify.unpicklify(JSON.parse(serializedData), classes)
  }

}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}