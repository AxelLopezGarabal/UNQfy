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

  filterArtists(aPredicate) {
    return this.allArtists.filter(aPredicate)
  }

  findBy(aPredicate) {
    const artist = this.allArtists.find(aPredicate)
    if (artist === undefined) throw 'artist not found'
    return artist
  }

  findById(id) {
    return this.findBy(artist => artist.id === id)
  }

  findAuthorOfAlbum(anAlbum) {
    return this.findBy(artist => artist.isTheAutorOfAlbum(anAlbum))
  }

  /* ALBUMS */
  filterAlbums(aPredicate) {
    return this.allAlbums.filter(aPredicate)
  }
  
  findAlbumBy(aPredicate, errorMessage="album not found") {
    const album = this.allAlbums.find(aPredicate)
    if (album == undefined)
      throw errorMessage
    return album
  }

  findAlbumById(id) {
    return this.findAlbumBy(album => album.id === id)
  }

  /* TRACKS */
  filterTracks(aPredicate) {
    return this.allTracks.filter(aPredicate)
  }

}