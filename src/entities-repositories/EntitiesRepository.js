require('../auxi/extenciones').extendArray()
const EntityNotFound = require('../exceptions/EntityNotFound')

module.exports = 
class EntitiesRepository {

  constructor(artists=[], users=[], playlists=[]) {
    this._artists   = artists
    this._users     = users
    this._playlists = playlists
  }

  get artists()   { return this._artists }
  get albums()    { return this.artists.flatMap(artist => artist.albums) }
  get tracks()    { return this.artists.flatMap(artist => artist.allTracks) }
  get users()     { return this._users }
  get playlists() { return this._playlists }

  _entities(entityName) { return this[`${entityName}s`] }

  add(entityName, anEntity) {
    this._entities(entityName).push(anEntity)
  }

  find(entityName, aPredicate, errorMessage='') {
    const entity = this._entities(entityName).find(aPredicate)
    if (entity == undefined) throw new EntityNotFound(errorMessage)
    return entity
  }

  findBy(entityName, {prop, value}) {
    return this.find(entityName, entity => entity[prop] === value, `Could not find "${entityName}" with "${prop}" equal to "${value}"`)
  }

  filter(entityName, aPredicate) {
    return this._entities(entityName).filter(aPredicate)
  }

  someHas(entityName, {prop, value}) {
    return this._entities(entityName).some(entiry => entiry[prop] === value)
  }

  forEach(entityName, aFunction) {
    this._entities(entityName).forEach(aFunction)
  }

  filterAll(aPredicate) {
    return {
      artists  : this.artists.filter(aPredicate),
      albums   : this.albums.filter(aPredicate),
      tracks   : this.tracks.filter(aPredicate),
      playlists: this.playlists.filter(aPredicate),
    }
  }

  /***********************************/
  removeArtist(artistId) {
    const artist = this.findBy('artist', {prop: 'id', value: artistId})
    this.removeFromAllPlaylist(artist.allTracks)
    this.artists.remove(artist)
  }

  removePlaylist(playlistId){
    this.playlists.remove(this.findBy('playlist', {prop: 'id', value: playlistId}))
  }

  removeFromAllPlaylist(tracks){
    this.playlists.forEach(playlist => playlist.removeAll(tracks))
  }
  
}