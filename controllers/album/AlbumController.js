module.exports = {
  getAll: require('../generic-entity-controller/get-all')('album'),
  getOne: require('../generic-entity-controller/get-one')('album'),
  post:   require('./post'),
  delete: require('../generic-entity-controller/delete')('album')
}