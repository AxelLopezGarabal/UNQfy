const express = require('express')

module.exports = (controllers, unqfy) =>
express.Router()
  .get('/'      , controllers.getAll(unqfy))
  .get('/:id'   , controllers.getOne(unqfy))
  .post('/'     , controllers.post(unqfy))
  .delete('/:id', controllers.delete(unqfy))