module.exports = {
  getAll: require('../generics/get-all')('artist'),
  getOne: require('../generics/get-one')('artist'),
  post:   require('./post'),
  delete: require('../generics/delete')('artist')
}