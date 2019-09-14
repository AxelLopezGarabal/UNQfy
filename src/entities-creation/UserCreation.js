const EntityCreation = require('./EntityCreation')
const User           = require('../entities/User')
const SomeoneAlreadyRegisterUnderName = require('../exceptions/SomeoneAlreadyRegisterUnderName')

module.exports =
class UserCreation extends EntityCreation {

  get _entityClass()          { return User    }
  get _targetCollectionName() { return 'users' }

 _validateDataObject() {
    if (this._isArtistNameAlreadyRegister) {
      throw new SomeoneAlreadyRegisterUnderName(this._dataObject.name)
    }
  }

  get _isArtistNameAlreadyRegister() {
    return this._unqfy.existSomeoneCalled(this._dataObject.name)
  }

}