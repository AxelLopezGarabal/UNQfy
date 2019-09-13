const EntityCreation = require('./EntityCreation')
const Artist = require('../entities/Artist')
const ArtistAlreadyRegisterUnderName = require('../exceptions/ArtistAlreadyRegisterUnderName')

module.exports =
class ArtistCreation extends EntityCreation {

  get _entityClass()          { return Artist    }
  get _targetCollectionName() { return 'artists' }

  _validateDataObject() {
    if (this._isArtistNameAlreadyRegister) {
      throw new ArtistAlreadyRegisterUnderName(this._dataObject.name)
    }
  }

  get _isArtistNameAlreadyRegister() {
    return this._unqfy._hasArtistCalled(this._dataObject.name)
  }

}