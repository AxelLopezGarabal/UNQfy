const EntityCreation = require('./EntityCreation')
const Album = require('../entities/Album')

module.exports =
class AlbumCreation extends EntityCreation {

  get _entityClass()          { return Album    }
  get _targetCollectionName() { return 'albums' }

  _validateDataObject() {
    
  }


}