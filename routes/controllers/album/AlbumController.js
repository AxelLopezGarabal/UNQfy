module.exports = {
  getAll: require('../generics/get-all')('album'),
  getOne: require('../generics/get-one')('album'),
  post:   require('./post'),
  delete: require('../generics/delete')('album')
}