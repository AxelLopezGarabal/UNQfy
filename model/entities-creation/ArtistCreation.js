const EntityCreation = require('./EntityCreation')
const Artist = require('../entities/Artist')
const ArtistaYaExiste = require('../exceptions/ArtistaYaExiste')//const SomeoneAlreadyRegisterUnderName = require('../exceptions/SomeoneAlreadyRegisterUnderName')

module.exports =
class ArtistCreation extends EntityCreation {

  get _entityClass() {
    return Artist
  }

  _validateDataObject() {
    if (this._isArtistNameAlreadyRegister) {
      throw new ArtistaYaExiste(this._dataObject.name)
    }
  }

  get _isArtistNameAlreadyRegister() {
    return this._unqfy.existSomeoneCalled(this._dataObject.name)
  }

}