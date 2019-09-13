require('../auxi/extenciones').extendArray()
const ArtistRepository = require('./ArtistRepository')

module.exports = 
class EntitiesRepository {

  constructor(artists=[], users=[], playlists=[]) {
    this._artistsRepo = new ArtistRepository(artists)
    this._users       = users
    this._playlists   = playlists
  }

  /** QUERIES ALL **/
  get playlists() { return this._playlists              }
  get artists()   { return this._artistsRepo.allArtists }
  get albums()    { return this._artistsRepo.allAlbums  }
  get tracks()    { return this._artistsRepo.allTracks  }

  /******* PLAYLIST **************/
  addPlaylist(newPlaylist) {
    this.playlists.push(newPlaylist)
  }

  removePlaylist(playlistId){
    this.playlists.remove(this.getPlaylistById(playlistId))
  }

  _removeFromAllPlaylist(tracks){
    console.log('_removeFromAllPlaylist ----->', tracks)
    this.playlists.forEach(playlist => playlist.removeAll(tracks))
  }
  /******************************/

  /** TESTING **/
  someArtist(aPredicate) {
    return this._artistsRepo.some(aPredicate)
  }

  /** ADDITIONS  **/
  addArtist(newArtist) {
    this._artistsRepo.add(newArtist)
  }

  addAlbum(artistId, newAlbum) {
    this._artistsRepo.getById(artistId).addAlbum(newAlbum)
  }

  addTrack(albumId, newTrack) {
    const album = this._artistsRepo.getAlbumById(albumId)
    this._artistsRepo.getAuthorOfAlbum(album).addTrack(albumId, newTrack)
  }

  /** REMOVES **/
  removeArtist(artistId) {
    const artist = this._artistsRepo.getById(artistId)
    this._removeFromAllPlaylist(artist.allTracks)
    this._artistsRepo.remove(artist)
  }

  removeAlbum(albumId) {
    const album = this.getAlbumById(albumId)
    this._removeFromAllPlaylist(album.tracks)
    this._artistsRepo.getAuthorOfAlbum(album).removeAlbum(album)
  }

  removeTrack(trackId) { // TODO: test
    const track = this.getTrackById(trackId)
    this._removeFromAllPlaylist([track])
    this.getAuthorOfTrack(track).removeTrack(track)
  }

  /** QUERY ONE**/
  getArtistById(id)   { return this.artists.find(artist => artist.id === id) }
  getAlbumById(id)    { return this._artistsRepo.getAlbumById(id) }
  getTrackById(id)    { return this._artistsRepo.getTrackById(id) }
  getPlaylistById(id) { return this.playlists.find(playlist => playlist.id === id) }

  getArtistByProperty(propertyName,expectedValue)   { return this.getArtistBy(artist => artist[propertyName] === expectedValue) }
  getAlbumByProperty(propertyName,expectedValue)    { return this.getAlbumBy(album => album[propertyName] === expectedValue) }
  getTrackByProperty(propertyName,expectedValue)    { return this.getTrackBy(track => track[propertyName] === expectedValue) }
  getPlaylistByProperty(propertyName,expectedValue) { return this.getPlaylistBy(playlist => playlist[propertyName] === expectedValue) }

  getArtistBy(aPredicate) {
    return this._artistsRepo.getBy(aPredicate)
  }

  getAlbumBy(aPredicate) {
    const album = this.albums.find(aPredicate)
    if (album === undefined) throw 'album not found'
    return album
  }

  getAllTracksBy(aPredicate) {
    return this._artistsRepo.findAllTracksBy(aPredicate)
  }

  /** QUERY MANY **/
  getTracksMatchingGenres(genres) {
    return this._artistsRepo.findAllTracksBy(track => track.matchSomeGenreFrom(genres))
      }

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
  
  // _getByIdIn(aCollectionName, id, errorMessage) {
  //   return this._getByPredicateIn(aCollectionName, obj => obj.id === id, `No se encontro entidad con id ${id} en ${aCollectionName}`)
  // }

  // _getByPredicateIn(aCollectionName, predicate, errorMessage='Elemento no encontrado') {
  //   const element = this[aCollectionName].find(predicate) 
  //   if (element == undefined)
  //     throw errorMessage
  //   return element
  // }

}