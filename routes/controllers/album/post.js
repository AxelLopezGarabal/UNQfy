const postSchema                  = require('./post-schema')
const makeAlbumFullRepresentation = require('./make-album-full-representation')

const { respondCreated, respondResourceAlreadyExist, respondBadRequest } = require('../responses')

const invalidBody = {
  canHandle: (unqfy, req)   => postSchema.validate(req.body).error != null,
  handle: (unqfy, req, res) => respondBadRequest(res, postSchema.validate(req.body).error)
}

const resourceAlreadyExist = {
  canHandle: (unqfy, req)   => unqfy.albums.some(album => album.name === req.body.name), // TODO: estoy rompiendo el encapsulamiento
  handle: (unqfy, req, res) => respondResourceAlreadyExist(res)
}

const createResource = {
  canHandle: ()             => true,
  handle: (unqfy, req, res) => {
    const { artistId, name, year } = req.body

    const album        = unqfy.addAlbum(artistId, { name, year })
    const responseBody = makeAlbumFullRepresentation(album)

    respondCreated(res, responseBody)
  }
}

const responses = [
  invalidBody,
  resourceAlreadyExist,
  createResource
]

module.exports = unqfy => (req, res, next) =>
  responses
    .find(handler => handler.canHandle(unqfy, req))
    .handle(unqfy, req, res)




