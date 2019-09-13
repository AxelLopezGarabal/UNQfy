require('../auxi/extenciones').extendArray()

module.exports =
class ArtistRepository {

  constructor(artists=[]) {
    this._artists = artists
  }
  
  get allArtists(){ return this._artists }
  get allAlbums() { return this.allArtists.flatMap(artist => artist.albums) }
  get allTracks() { return this.allAlbums.flatMap(artist => artist.tracks) }

  some(aPredicate) {
    return this.allArtists.some(aPredicate)
  }

  add(anArtist) {
    this.allArtists.push(anArtist)
  }

  remove(anArtist) {
    this.allArtists.remove(anArtist)
  }

  /*  */
  findAllArtistsBy(aPredicate) {
    return this.allArtists.filter(aPredicate)
  }

  getBy(aPredicate) {
    const artist = this.allArtists.find(aPredicate)
    if (artist === undefined) throw 'artist not found'
    return artist
  }

  getById(id) {
    return this.getBy(artist => artist.id === id)
  }

  getAuthorOfAlbum(anAlbum) {
    return this.getBy(artist => artist.isTheAutorOfAlbum(anAlbum))
  }

  /* TRACKS */
  findAllTracksBy(aPredicate) {
    return this.allTracks.filter(aPredicate)
  }

  getTrackBy(aPredicate, errorMessage="album not found") {
    
  }

  getTrackById(id) {

  }

  /* ALBUMS */
  findAllAlbumsBy(aPredicate) {
    return this.allAlbums.filter(aPredicate)
  }
  
  getAlbumBy(aPredicate, errorMessage="album not found") {
    const album = this.allAlbums.find(aPredicate)
    if (album == undefined)
      throw errorMessage
    return album
  }

  getAlbumById(id) {
    return this.getAlbumBy(album => album.id === id)
  }

}