const EntityCreation = require('./EntityCreation')
const Track = require('../entities/Track')

module.exports =
class TrackCreation extends EntityCreation {

  get _entityClass() {
    return Track
  }

  _validateDataObject() {
    
  }


}