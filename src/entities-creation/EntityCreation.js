module.exports =
class EntityCreation {

  constructor(anUNQfy, dataObject) {
    this._unqfy      = anUNQfy
    this._dataObject = dataObject
  }

  handle() {
    this._validateDataObject()
    this._createObject()
    return this._newObject
  }

  get _entityClass()    { throw 'Subclass responsability' }
  _validateDataObject() { throw 'Subclass responsability' }

  _createObject() {
    this._newObject = new this._entityClass({ id: this._uniqueId, ...this._dataObject })
  }

  get _uniqueId() { return this._unqfy._generateUniqueId() }

}