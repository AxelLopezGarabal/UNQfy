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

  removeBy(entityName, {prop, value}) {
    const entity = this.findBy(entityName, {prop, value})
    this._entities(entityName).remove(entity)
  }

  find(entityName, aPredicate, errorMessage='') {
    const entity = this._entities(entityName).find(aPredicate)
    if (entity == undefined) throw new EntityNotFound(errorMessage)
    return entity
  }

  findBy(entityName, {prop, value}) {
    return this.find(entityName, entity => entity[prop] === value, `Could not find "${entityName}" with "${prop}" equal to "${value}"`)
  }

  filterAllBy({prop, value}) {
    return {
      artists  : this.filterBy('artist', {prop, value}),
      albums   : this.filterBy('album', {prop, value}),
      tracks   : this.filterBy('track', {prop, value}),
      playlists: this.filterBy('playlist', {prop, value}),
    } 
  }

  filter(entityName, aPredicate) {
    return this._entities(entityName).filter(aPredicate)
  }

  filterBy(entityName, {prop, value}) {
    return this.filter(entityName, entityName => entityName[prop] === value)
  }

  filterAll(aPredicate) {
    return {
      artists  : this.artists.filter(aPredicate),
      albums   : this.albums.filter(aPredicate),
      tracks   : this.tracks.filter(aPredicate),
      playlists: this.playlists.filter(aPredicate),
    }
  }

  someHas(entityName, {prop, value}) {
    return this._entities(entityName).some(entiry => entiry[prop] === value)
  }

  forEach(entityName, aFunction) {
    this._entities(entityName).forEach(aFunction)
  }

  ////////////////  
  removeFromAllPlaylist(tracks){
    this.playlists.forEach(playlist => playlist.removeAll(tracks))
  }
  
}