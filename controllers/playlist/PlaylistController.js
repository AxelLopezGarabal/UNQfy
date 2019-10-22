module.exports = {
    getAll: require('../generic-entity-controller/get-all')('playlist'),
    getOne: require('../generic-entity-controller/get-one')('playlist'),
    post:   require('./post_genre'),
    delete: require('../generic-entity-controller/delete')('playlist')
  }