const EntityCreation = require('./EntityCreation')
const Album          = require('../entities/Album')
const ArtistNotFound = require('../exceptions/ArtistNotFound')

module.exports =
class AlbumCreation extends EntityCreation {

  get _entityClass()          { return Album    }
  get _targetCollectionName() { return 'albums' }

  _validateDataObject() {
    // if (this._artistNotFound) {
    //   console.log("----------_>>>",this._unqfy.getArtistById(this._artistId))
    //   throw new ArtistNotFound(this._artistId)
    // }
  }

  get _artistNotFound() {
    return !this._unqfy.existsArtistWithId(this._artistId)
  }

  get _artistId() {
    return this._dataObject.artistId
  }
}