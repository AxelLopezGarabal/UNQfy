require('../auxi/extenciones').extendArray()

module.exports = 
class EntitiesRepository {

  constructor(artists=[], users=[], playlists=[]) {
    this._artists   = artists
    this._users     = users
    this._playlists = playlists
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
    return this._artists
  }
  
  addArtist(newArtist) {
    this.artists.push(newArtist)
  }

  removeArtist(artistId) {
    const artist = this.findArtistById(artistId)
    this.removeFromAllPlaylist(artist.allTracks)
    this.artists.remove(artist)
  }

  someArtist(aPredicate) {
    return this.artists.some(aPredicate)
  }

  findArtistBy(aPredicate) {
    const artist = this.artists.find(aPredicate)
    if (artist == undefined) throw 'artist not found'
    return artist
  }

  findArtistById(id) {
    return this.findArtistBy(artist => artist.id === id)
  }

  filterArtists(aPredicate) {
    return this.artists.filter(aPredicate)
  }

  findAuthorOfAlbum(anAlbum) {
    return this.findArtistBy(artist => artist.isTheAutorOfAlbum(anAlbum))
  }

  /******* ALBUMS **************/
  get albums() {
    return this.artists.flatMap(artist => artist.albums)

  }

  addAlbum(artistId, newAlbum) {
    this.findArtistById(artistId).addAlbum(newAlbum)
  }

  removeAlbum(albumId) {
    const album = this.findAlbumById(albumId)
    this.removeFromAllPlaylist(album.tracks)
    this.findAuthorOfAlbum(album).removeAlbum(album)
  }

  findAlbumById(id) {
    return this.findAlbumBy(album => album.id === id)
  }

  findAlbumBy(aPredicate) {
    const album = this.albums.find(aPredicate)
    if (album == undefined) throw 'album not found'
    return album
  }

  /******* TRACKS **************/
  get tracks() {
    return this.artists.flatMap(artist => artist.allTracks)
  }

  addTrack(albumId, newTrack) {
    const album = this.findAlbumById(albumId)
    this.findAuthorOfAlbum(album).addTrack(albumId, newTrack)
  }

  removeTrack(trackId) { // TODO: test
    const track = this.findTracks(trackId)
    this.removeFromAllPlaylist([track])
    this.getAuthorOfTrack(track).removeTrack(track)
  }

  findTrackById(id) {
    return this.findTrackBy(track => track.id === id)
  }

  findTrackBy(aPredicate) {
    const track = this.tracks.find(aPredicate)
    if (track == undefined) throw 'track not found'
    return track
  }

  filterTracks(aPredicate) {
    return this.tracks.filter(aPredicate)
  }

  //
  filterAll(aPredicate) {
    return {
      artists  : this.artists.filter(aPredicate),
      albums   : this.albums.filter(aPredicate),
      tracks   : this.tracks.filter(aPredicate),
      playlists: this.playlists.filter(aPredicate),
    }
  }
  
}