const EntityCreation = require('./EntityCreation')
const Album          = require('../entities/Album')
const ArtistNotFound = require('../exceptions/ArtistNotFound')

module.exports =
class AlbumCreation extends EntityCreation {

  get _entityClass() {
    return Album
  }

  _validateDataObject() {
    
  }

}