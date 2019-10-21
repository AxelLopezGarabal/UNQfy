const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy

const { Artist, Album, Track, User, Playlist, Listening } = require('./entities/all') // esto hace falta para el framework de persistencia
const {ArtistCreation, AlbumCreation, TrackCreation, UserCreation} = require('./entities-creation/all') // Method objects

const PlaylistGenerator = require('./PlaylistGenerator.js')

const EntitiesRepository = require('./entities-repositories/EntitiesRepository')


class UNQfy {

  constructor(
    albumsDataProvider = {findFor: artistName => []},
    lyricsProvider     = {find: () => ''},
    entitiesRepository = new EntitiesRepository()
  )
  {
    this._entitiesRepository = entitiesRepository
    this._nextId             = 0
    this._albumsDataProvider = albumsDataProvider
    this._lyricsProvider     = lyricsProvider
  }

  _generateUniqueId() { return this._nextId++ }

  get playlists() { return this._entitiesRepository.playlists }
  get artists()   { return this._entitiesRepository.artists }
  get albums()    { return this._entitiesRepository.albums }
  get tracks()    { return this._entitiesRepository.tracks }

  /////////////////////
  addUser({name}) {
    const newUser = new UserCreation(this, {name}).handle()
    this._entitiesRepository.add('user', newUser)
    return newUser
  }

  registerListening(userId, trackId) {
    const user   = this.getUserById(userId)
    const track  = this.getTrackById(trackId)
    const album  = this._getAlbumContaining(track)
    const artist = this._getAuthorOfAlbum(album)
    
    const newListening = new Listening({listener: user, artist, album, track})

    user.addToHistory(newListening)
    artist.registerOthersListeningsOfHisArt(newListening)
  }

  _getAlbumContaining(aTrack) {
    return this._entitiesRepository.find('album', album => album.hasTrack(aTrack))
  }

  createPlaylistFor(userId, playlistName, genresToInclude, maxDuration) {
    const newPlaylist = this.createPlaylist(playlistName, genresToInclude, maxDuration)
    const user        = this.getUserById(userId)
    user.registerPlaylist(newPlaylist)
    return newPlaylist
  }

  /* ARTIST */
  addArtist({name, country}) {
    const newArtist = new ArtistCreation(this, {name, country}).handle()
    this._entitiesRepository.add('artist', newArtist)
    return newArtist
  }

  removeArtist(artistId) {
    const artist = this.getArtistById(artistId)
    this._removeFromAllPlaylists(artist.allTracks)
    this._entitiesRepository.removeBy('artist'  , {prop: 'id', value: artistId})
  }

  existsArtistWithId(id) {
    return this._entitiesRepository.someHas('artist', {prop: 'id', value: id})
  }

  existSomeoneCalled(aName) {
    return this._entitiesRepository.someHas('artist', {prop: 'name', value: aName}) ||
           this._entitiesRepository.someHas('user'  , {prop: 'name', value: aName})
  }

  /* ALBUM */
  addAlbum(artistId, {name, year}) {
    const newAlbum = new AlbumCreation(this, {name, year}).handle()
    const artist   = this.getArtistById(artistId)
    artist.addAlbum(newAlbum)
    return newAlbum
  }

  removeAlbum(albumId) {
    const album  = this.getAlbumById(albumId)
    const artist = this._getAuthorOfAlbum(album)
    this._removeFromAllPlaylists(album.tracks)
    artist.removeAlbum(album)
  }

  /* TRACK */
  addTrack(albumId, {name, duration, genres}) {
    const newTrack = new TrackCreation(this, {name, duration, genres}).handle()
    const album    = this.getAlbumById(albumId)
    const artist   = this._getAuthorOfAlbum(album)
    artist.addTrackTo(album, newTrack)
    return newTrack
  }
  
  removeTrack(trackId) {
    const track  = this.getTrackById(trackId)
    const artist = this.getAuthorOfTrack(track)
    this._removeFromAllPlaylists([track])
    artist.removeTrack(track)
  }

  /* PLAYLIST */
  createPlaylist(name, genresToInclude, maxDuration) {
    const newPlaylist = new PlaylistGenerator().generate(this._generateUniqueId(), name, genresToInclude, maxDuration, this.tracks)
    this._entitiesRepository.add('playlist', newPlaylist)
    return newPlaylist
  }

  removePlaylist(playlistId) {
    this._entitiesRepository.removeBy('playlist', {prop: 'id', value: playlistId})
  }

  _removeFromAllPlaylists(tracks) {
    this._entitiesRepository.forEach('playlist', playlist => playlist.removeAll(tracks))
  }

  /** BUSQUEDAS **/
  searchByName(aName)               {return this._entitiesRepository.filterAll(entity => new RegExp(`\\b${aName}\\b`, 'i').test(entity.name))}
  searchByNamePartial(aPartialName) { return this._entitiesRepository.filterAll(entity => new RegExp(aPartialName, 'i').test(entity.name)) }

  getArtistById(id)      { return this._entitiesRepository.findBy('artist'  , {prop: 'id', value: id}) }
  getAlbumById(id)       { return this._entitiesRepository.findBy('album'   , {prop: 'id', value: id}) }
  getTrackById(id)       { return this._entitiesRepository.findBy('track'   , {prop: 'id', value: id}) }
  getPlaylistById(id)    { return this._entitiesRepository.findBy('playlist', {prop: 'id', value: id}) }
  getUserById(id)        { return this._entitiesRepository.findBy('user'    , {prop: 'id', value: id}) }

  getArtistByName(aName) { return this._entitiesRepository.findBy('artist', { prop: 'name', value: aName }) }

  getTracksMatchingGenres(genres) {
    return this._entitiesRepository.filter('track', track => track.matchSomeGenreFrom(genres))
  }

  getTracksMatchingArtist(artistName) {
    // TODO: en los tests que nos pasaron se le pasa "un artista" pero el parametro se llama "artistName"
    //return this.getArtistByName(artistName).allTracks
    return artistName.allTracks
  }

  getTracksMatchingArtistName(artistName) {
    return this.getArtistByName(artistName).allTracks
  }

  _getAuthorOfAlbum(anAlbum) {
    return this._entitiesRepository.find('artist', artist => artist.isTheAuthorOfAlbum(anAlbum))
  }

  getAuthorOfTrack(aTrack) {
    return this._entitiesRepository.find('artist', artist => artist.isTheAuthorOfTrack(aTrack))
  }

  findBy(entityName, {prop, value}) {
    return this._entitiesRepository.findBy(entityName, {prop, value})
  }

  filterAllBy({prop, value}) {
    return this._entitiesRepository.filterAllBy({prop, value})
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

  /*  VISADO 2 */
  getAlbumsForArtist(artistName) {
    return this.getArtistByName(artistName).albums
  }

  async populateAlbumsForArtist(artistName) {
    const artist = this.getArtistByName(artistName)
    
    this._albumsDataProvider.findFor(artistName)
      .then(albumsData =>
        albumsData.forEach(({name, year, tracks}) => {
          const addedAlbum = this.addAlbum(artist.id, { name, year })
          
          tracks.forEach((trackData) =>
            this.addTrack(addedAlbum.id, trackData)
          ) 
        })
      )   
    
  }

}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}