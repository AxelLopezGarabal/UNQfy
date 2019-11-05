const picklify = require('picklify') // para cargar/guarfar unqfy
const fs = require('fs') // para cargar/guarfar unqfy
const lyricFinderModule = require('../musicMatch') // contiene la request a MusicMatch
const populatorModule = require('../spotify')// contiene la funcion de request a spotify
const LyricFinder = require('../musicMatch').module.LyricFinder

const ArtistNotFound = require('./exceptions/ArtistNotFound')
const { Artist, Album, Track, User, Playlist, Listening } = require('./entities/all') // esto hace falta para el framework de persistencia
const {ArtistCreation, TrackCreation, UserCreation} = require('./entities-creation/all') // Method objects

const PlaylistGenerator = require('./PlaylistGenerator.js')

const EntitiesRepository = require('./entities-repositories/EntitiesRepository')


class UNQfy {

  constructor( 
    entitiesRepository = new EntitiesRepository()
  )
  {
    this._entitiesRepository = entitiesRepository
    this._nextId             = 1
    this.lyricsProvider      = new LyricFinder()
  }

  _generateUniqueId() { return this._nextId++ }

  get playlists() { return this._entitiesRepository.playlists }
  get artists()   { return this._entitiesRepository.artists }
  get albums()    { return this._entitiesRepository.albums }
  get tracks()    { return this._entitiesRepository.tracks }
  get id()        { return this._nextId }
  
  /////////////////////
  addUser({name}) {
    const newUser = new UserCreation(this, {name}).handle()
    this._entitiesRepository.add('user', newUser)
    return newUser
  }

  verifyId(id){
    return this._nextId >= id
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

  existsArtistWithName(name){
    return this._entitiesRepository.someHas('artist', {prop: 'name', value: name})
  }

  existSomeoneCalled(aName) {
    return this._entitiesRepository.someHas('artist', {prop: 'name', value: aName}) ||
           this._entitiesRepository.someHas('user'  , {prop: 'name', value: aName})
  }

  /* ALBUM */
  addAlbum(artistId, {name, year}) {
    const newAlbum = new Album({ id: this._generateUniqueId(), ...{name, year} })
    const artist   = this.getArtistById(artistId)
    artist.addAlbumByForce(newAlbum)
    return newAlbum
  }

  verifyAlbum(artistId, name){
    return this.getArtistById(artistId);
  }

  removeAlbum(albumId) {
    const album  = this.getAlbumById(albumId)
    const artist = this._getAuthorOfAlbum(album)
    this._removeFromAllPlaylists(album.tracks)
    artist.removeAlbum(album)
  }

  /* TRACK */
  addTrack(albumId, {name, duration, genres}) {
    const lyricsProvider = this.lyricsProvider;
    const newTrack = new TrackCreation(this, {name, duration, genres, lyricsProvider}).handle()
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

  getTracksMatchingArtist(artist) {
    return artist.allTracks
  }

  getTracksMatchingArtistName(artistName) {
    return this.getArtistByName(artistName).allTracks
  }

  _getAuthorOfAlbum(anAlbum) {
    return this._entitiesRepository.find('artist', artist => artist.isTheAuthorOfAlbum(anAlbum))
  }

  isAuthorOfAlbum(id, name){
    const artist = this.getArtistById(id)
    const album  = this.searchByName(name).albums[0]
    return artist.isTheAuthorOfAlbum(album)
  }
  
  getAuthorOfTrack(aTrack) {
    return this._entitiesRepository.find('artist', artist => artist.isTheAuthorOfTrack(aTrack))
  }

  findBy(entityName, {prop, value}) {
    return this._entitiesRepository.findBy(entityName, {prop, value})
  }

  filterAllBy({prop, value}) {
    return this._entitiesRepository.filterAllBy({prop, value})}

  getPlaylistByQuery(query){
    const durationLT = query.durationLT === undefined
    const durationGT = query.durationGT === undefined
    const name       = query.name       === undefined
    var playlist = this.playlists.filter(playlist =>
      ((durationLT)||(playlist.duration <= query.durationLT))
    &&((durationGT)||(playlist.duration >= query.durationGT))
    &&((   name   )||(new RegExp(query.name, 'i').test(playlist.name))))
    return playlist
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
    if(this.existsArtistWithName(artistName)){
      this.populateAlbumsForArtist(artistName);
      return this.getArtistByName(artistName).albums
    }else{
      throw new ArtistNotFound(artistName)
    }
  }
  
  updateArtist(artistId, artistData) {
    const artist = this.getArtistById(artistId)
    artist.update(artistData)
    return artist
  }

  updateAlbum(albumId, { year }) {
    const album = this.getAlbumById(albumId)
    album.update({year})
    return album
  }

  async populateAlbumsForArtist(artistName) {
    const artist = this.getArtistByName(artistName);
    const x = ((new populatorModule.module.Populator()).populateResult(artistName)
    .then( response => {return response.items})
      .then( items => items.forEach(elem => {
          this.addAlbum(artist.id, {name: elem.name, year: elem.release_date})
      })).then(res => this.save('backend'))
    ).catch(error => {console.log(error)})
  }

  getLyiricsFor(artistname, trackName){
    let tracks = this.getTracksMatchingArtistName(artistname).filter(elem => elem.name == trackName);
    if(tracks.length != 0){
      let firstMatch = tracks[0]
      if(firstMatch.lyrics == ''){
        this.lyricsProvider.getLyrics(artistname, trackName, firstMatch)
        return 'sorry, try again later'
      }
      else{
        return firstMatch.lyrics
      }
    }
  }
}

  

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
}
