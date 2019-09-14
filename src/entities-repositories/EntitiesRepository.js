require('../auxi/extenciones').extendArray()
const ArtistRepository = require('./ArtistRepository')

module.exports = 
class EntitiesRepository {

  constructor(artists=[], users=[], playlists=[]) {
    this._artistsRepo = new ArtistRepository(artists)
    this._users       = users
    this._playlists   = playlists
  }

  /******* PLAYLIST **************/
  get playlists() {
    return this._playlists
  }

  addPlaylist(newPlaylist) {
    this.playlists.push(newPlaylist)
  }

  removePlaylist(playlistId){
    this.playlists.remove(this.findPlaylistById(playlistId))
  }

  removeFromAllPlaylist(tracks){
    this.playlists.forEach(playlist => playlist.removeAll(tracks))
  }

  findPlaylistById(id) {
    return this.playlists.find(playlist => playlist.id === id)
  }

  /******* ARTIST **************/
  get artists() {
    return this._artistsRepo.allArtists
  }
  
  addArtist(newArtist) {
    this._artistsRepo.add(newArtist)
  }

  removeArtist(artistId) {
    const artist = this._artistsRepo.findById(artistId)
    this.removeFromAllPlaylist(artist.allTracks)
    this._artistsRepo.remove(artist)
  }

  someArtist(aPredicate) {
    return this._artistsRepo.some(aPredicate)
  }

  findArtistBy(aPredicate) {
    return this._artistsRepo.findBy(aPredicate)
  }

  findArtistById(id) {
    return this._artistsRepo.findById(id)
  }

  filterArtists(aPredicate) {
    return this._artistsRepo.filterArtists(aPredicate)
  }

  /******* ALBUMS **************/
  get albums() {
    return this._artistsRepo.allAlbums
  }

  addAlbum(artistId, newAlbum) {
    this._artistsRepo.findById(artistId).addAlbum(newAlbum)
  }

  removeAlbum(albumId) {
    const album = this._artistsRepo.findAlbumById(albumId)
    this.removeFromAllPlaylist(album.tracks)
    this._artistsRepo.findAuthorOfAlbum(album).removeAlbum(album)
  }

  findAlbumBy(aPredicate) {
    const album = this.albums.find(aPredicate)
    if (album === undefined) throw 'album not found'
    return album
  }

  findAlbumById(id) {
    return this._artistsRepo.findAlbumById(id)
  }

  /******* TRACKS **************/
  get tracks() { return this._artistsRepo.allTracks }

  addTrack(albumId, newTrack) {
    const album = this._artistsRepo.findAlbumById(albumId)
    this._artistsRepo.findAuthorOfAlbum(album).addTrack(albumId, newTrack)
  }

  removeTrack(trackId) { // TODO: test
    const track = this.findTracks(trackId)
    this.removeFromAllPlaylist([track])
    this.getAuthorOfTrack(track).removeTrack(track)
  }

  findTrackBy(aPredicate) {
    return this.find(aPredicate)
  }

  findTrackById(id) {
    return this.findTrackBy(track => track.id === id)
  }

  filterTracks(aPredicate) {
    return this._artistsRepo.filterTracks(aPredicate)
  }

  /** QUERY MANY **/
  searchByNamePartial(aPartialName) {
    return this.filterAll(anEntity => RegExp(aPartialName).test(anEntity.name))
  }

  searchByName(aName) {
    //return this.filterAll(entity => entity.name === aName)
    return this.filterAll(entity => new RegExp(aName).test(entity.name))
  }

  filterAll(aPredicate) {
    return {
      artists  : this._artistsRepo.filterArtists(aPredicate),
      albums   : this._artistsRepo.filterAlbums(aPredicate),
      tracks   : this._artistsRepo.filterTracks(aPredicate),
      playlists: this.playlists.filter(aPredicate),
    }
  }
  
}