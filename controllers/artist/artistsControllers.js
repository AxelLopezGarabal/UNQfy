module.exports = {
  getAll: require('../generic-entity-controller/get-all')('artist'),
  getOne: require('../generic-entity-controller/get-one')('artist'),
  post:   require('./post'),
  delete: require('../generic-entity-controller/delete')('artist')
}