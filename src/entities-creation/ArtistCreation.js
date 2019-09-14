const EntityCreation = require('./EntityCreation')
const Artist = require('../entities/Artist')
const SomeoneAlreadyRegisterUnderName = require('../exceptions/SomeoneAlreadyRegisterUnderName')

module.exports =
class ArtistCreation extends EntityCreation {

  get _entityClass()          { return Artist    }
  get _targetCollectionName() { return 'artists' }

  _validateDataObject() {
    if (this._isArtistNameAlreadyRegister) {
      throw new SomeoneAlreadyRegisterUnderName(this._dataObject.name)
    }
  }

  get _isArtistNameAlreadyRegister() {
    return this._unqfy.existSomeoneCalled(this._dataObject.name)
  }

}