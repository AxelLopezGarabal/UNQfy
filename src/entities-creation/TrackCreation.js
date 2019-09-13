const EntityCreation = require('./EntityCreation')
const Track = require('../entities/Track')

module.exports =
class TrackCreation extends EntityCreation {

  get _entityClass()          { return Track    }
  get _targetCollectionName() { return 'tracks' }

  _validateDataObject() {
    
  }


}