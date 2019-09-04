
const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy

const Artist = require('./Artist.js')
const Album  = require('./Album.js')
const Track  = require('./Track.js')

const PlaylistGenerator = require('./PlaylistGenerator.js')

class UNQfy {
  constructor() {
    this._artists = []
  }

  get artists() { return this._artists }
  //get albums()  { return this.artists.flatMap(artist => artist.albums) } // TODO: ver por que no anda flatMap
  get albums()  { return this.artists.reduce((acc, artist) => [...acc, ...artist.albums], []) }
  //get tracks()  { return this.albums.flatMap(album => album.tracks) }
  get tracks()  { return this.albums.reduce((acc, album) => [...acc, ...album.tracks], []) }
  
  _generateUniqueId() { return Date.now() }

  _createContent(aClass,  dataObject) {
    return new aClass({ id: this._generateUniqueId(), ...dataObject })
  }

  searchByName(aName) {
    return [...this.artists, ...this.albums, ...this.tracks].filter(element => element.name === aName)
  }

  /////////////////////////////////////////////////////////////////////////////

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

  getArtistById(id)   { return this._getByIdIn(this.artists, id) }
  getAlbumById(id)    { return this._getByIdIn(this.albums, id)  }
  getTrackById(id)    { return this._getByIdIn(this.tracks, id)  }
  getPlaylistById(id) {  }

  getArtistByName(aName) {
    return this.artists.find(anArtist => anArtist.name === aName)
  }

  _getByIdIn(aCollection, id) { return aCollection.find(anObject => anObject.id === id) }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    return this.tracks.filter(track => track.matchSomeGenreFrom(genres))
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    // TODO: en el test pasa "un artista" pero el parametro se llama "artistName"
    //return this.getArtistByName(artistName).allTracks
    return artistName.allTracks
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
    return new PlaylistGenerator().generate(this._generateUniqueId(), name, genresToInclude, maxDuration, this.tracks)

  }

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
    const classes = [UNQfy]
    return picklify.unpicklify(JSON.parse(serializedData), classes)
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}

